import { Component, OnInit } from '@angular/core';
import { Equipe } from "../../../models/equipe";
import { EquipeService } from "../../../services/equipe.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-listequipe',
  templateUrl: './listequipe.component.html',
  styleUrls: ['./listequipe.component.css']
})
export class ListequipeComponent implements OnInit {
  equipeList: Equipe[] = [];
  filteredListEquipe: Equipe[] = [];
  searchQuery: string = '';

  constructor(private equipeService: EquipeService, private router: Router) { }

  ngOnInit(): void {
    this.fetchEquipes();
  }

  fetchEquipes(): void {
    this.equipeService.getAllEquipes().subscribe(
      (equipes: Equipe[]) => {
        this.equipeList = equipes;
        this.filterEquipes();
      },
      (error) => {
        // Handle error if data retrieval fails
        console.error('Error fetching equipes:', error);
        // Optionally, you could show an error message to the user here
      }
    );
  }

  addNewEquipe(): void {
    this.router.navigateByUrl('/main/creeequipe');
  }

  updateEquipe(equipe: Equipe): void {
    this.router.navigate(['/main/updateequipe', equipe.id]);
  }

  deleteEquipe(id: number): void {
    // Open a Swal confirmation dialog in French
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Voulez-vous vraiment supprimer cette équipe?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.equipeService.deleteEquipe(id).subscribe(
          () => {
            // On successful deletion
            this.equipeList = this.equipeList.filter((equipe: Equipe) => equipe.id !== id);
            this.filterEquipes();
            Swal.fire('Supprimé!', 'L\'équipe a été supprimée avec succès.', 'success');
          },
          (error) => {
            // On deletion error
            Swal.fire('Erreur', 'Une erreur est survenue lors de la suppression de l\'équipe.', 'error');
          }
        );
      }
    });
  }


  filterEquipes(): void {
    const searchTerm = this.searchQuery.toLowerCase().trim();

    if (!this.equipeList) {
      this.filteredListEquipe = [];
      return;
    }

    this.filteredListEquipe = this.equipeList.filter((equipe: Equipe) => {
      const equipeName = equipe.name.toLowerCase();
      return equipeName.includes(searchTerm);
    });
  }
}
