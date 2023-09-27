import { Component, OnInit } from '@angular/core';
import { Projet } from "../../../models/projet";
import { ProjetService } from "../../../services/projet.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-listeprojet',
  templateUrl: './listeprojet.component.html',
  styleUrls: ['./listeprojet.component.css']
})
export class ListeprojetComponent implements OnInit {
  filteredProjects: Projet[] = [];
  etatFilter: string = "Tous";
  nameSearch: string = "";

  constructor(private projetService: ProjetService, private router: Router) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projetService.getAllProjets().subscribe(
      (projects: Projet[]) => {
        this.filteredProjects = projects;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }





  ajouterProjet(): void {
    // Redirect to the project creation page
    this.router.navigateByUrl('/main/creeprojet');
  }

  openUpdateProjet(id: number): void {
    this.router.navigateByUrl(`/main/updateprojet/${id}`);
  }

  deleteProjet(projet: Projet): void {
    // Display a confirmation dialog before deleting the project
    Swal.fire({
      icon: 'warning',
      title: 'Confirmation',
      text: 'Êtes-vous sûr de vouloir supprimer ce projet ?',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        // Call the project service to delete the project
        this.projetService.deleteProjet(projet.id).subscribe(
          () => {
            Swal.fire({
              icon: 'success',
              title: 'Succès',
              text: 'Projet supprimé avec succès',
              confirmButtonText: 'OK',
              confirmButtonColor: '#3085d6'
            }).then(() => {
              // Reload the project list
              this.loadProjects();
            });
          },
          (error: any) => {
            // Handle error from the API response
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: 'Une erreur est survenue lors de la suppression du projet',
              confirmButtonText: 'OK',
              confirmButtonColor: '#3085d6'
            });
            console.log(error);
          }
        );
      }
    });
  }
}
