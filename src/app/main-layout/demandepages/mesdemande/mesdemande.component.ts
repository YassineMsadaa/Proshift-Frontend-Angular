import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DemandeService } from "../../../services/demande.service";
import { Demande } from "../../../models/demande";
import { User } from "../../../models/user";
import Swal from "sweetalert2";

@Component({
  selector: 'app-mesdemande',
  templateUrl: './mesdemande.component.html',
  styleUrls: ['./mesdemande.component.css']
})
export class MesdemandeComponent implements OnInit {
  listdemande: Demande[] = [];
  filteredListDemande: Demande[] = [];
  user: User | undefined;
  selectedType: string | undefined;
  selectedStatus: string | undefined;

  constructor(private demandeService: DemandeService, private router: Router) { }

  ngOnInit(): void {
    // Retrieve user ID from local storage
    const userId = localStorage.getItem('id');

    if (userId) {
      this.demandeService.getDemandesByUserId(parseInt(userId)).subscribe(
        (response: Demande[]) => {
          this.listdemande = response;
          this.filteredListDemande = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }

  filterDemandes(): void {
    this.filteredListDemande = this.listdemande;

    if (this.selectedType && this.selectedType !== 'Par type') {
      this.filteredListDemande = this.filteredListDemande.filter(
        (demande: Demande) => demande.type === this.selectedType
      );
    }

    if (this.selectedStatus !== undefined && this.selectedStatus !== 'Par status') {
      this.filteredListDemande = this.filteredListDemande.filter(
        (demande: Demande) => demande.status.toString() === this.selectedStatus
      );
    }
  }

  resetFilters(): void {
    this.selectedType = undefined;
    this.selectedStatus = undefined;
    this.filterDemandes();
  }

  deleteDemande(demande: Demande): void {
    // Show the confirmation dialog
    Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir supprimer cette demande ?',
      text: 'Cette action est irréversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Supprimer',
      confirmButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      cancelButtonColor: '#3085d6',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed, proceed with deletion
        this.demandeService.deleteDemande(demande.id).subscribe(
          () => {
            // Remove the deleted demand from the listdemande array
            const index = this.listdemande.findIndex((d: Demande) => d.id === demande.id);
            if (index !== -1) {
              this.listdemande.splice(index, 1);
            }

            // Remove the deleted demand from the filteredListDemande array
            const filteredIndex = this.filteredListDemande.findIndex((d: Demande) => d.id === demande.id);
            if (filteredIndex !== -1) {
              this.filteredListDemande.splice(filteredIndex, 1);
            }
          },
          (error: any) => {
            console.log(error);
          }
        );
      }
    });
  }
  ajouterDemande(): void {
    // Redirect to the project creation page
    this.router.navigateByUrl('/main/creedemande');
  }

  OpenUpdateModal(demande: Demande): void {
    // Navigate to the update page for the demande
    this.router.navigate(['main/updatedemande/', demande.id]);
  }
}
