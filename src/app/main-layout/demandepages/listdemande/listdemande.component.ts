import { Component, OnInit } from '@angular/core';
import { Demande } from "../../../models/demande";
import { User } from "../../../models/user";
import { DemandeService } from "../../../services/demande.service";
import { Router } from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listdemande',
  templateUrl: './listdemande.component.html',
  styleUrls: ['./listdemande.component.css']
})
export class ListdemandeComponent implements OnInit {
  listdemande: Demande[] = [];
  filteredListDemande: Demande[] = [];
  user: User | undefined;
  selectedType: string | undefined;
  selectedStatus: string | undefined;
  searchQuery: string = '';

  constructor(private demandeService: DemandeService, private router: Router) { }

  ngOnInit(): void {
    // Retrieve user ID from local storage
    const userId = localStorage.getItem('id');

    if (userId) {
      this.demandeService.getAllDemandes().subscribe(
        (response: Demande[]) => {
          this.listdemande = response;
          this.filteredListDemande = response;
          this.filterDemandes();
        },
        (error: any) => {
          console.log(error);
        }
      );
    }

    // Set initial values for filters
    this.selectedType = 'Par type';
    this.selectedStatus = 'Par statut';
  }

  filterDemandes(): void {
    this.filteredListDemande = this.listdemande;

    if (this.selectedType && this.selectedType !== 'Par type') {
      this.filteredListDemande = this.filteredListDemande.filter(
        (demande: Demande) => demande.type === this.selectedType
      );
    }

    if (this.selectedStatus && this.selectedStatus !== 'Par statut') {
      this.filteredListDemande = this.filteredListDemande.filter(
        (demande: Demande) => demande.status.toString() === this.selectedStatus
      );
    }

    if (this.searchQuery.trim() !== '') {
      this.filteredListDemande = this.filteredListDemande.filter(
        (demande: Demande) =>
          demande.user.username.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          demande.type.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  resetFilters(): void {
    this.selectedType = undefined;
    this.selectedStatus = undefined;
    this.searchQuery = '';
    this.filterDemandes();
  }

  deleteDemande(demande: Demande): void {
    Swal.fire({
      title: 'Êtes-vous sûr(e) ?',
      text: 'Cette action est irréversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.demandeService.deleteDemande(demande.id).subscribe(
          () => {
            const index = this.listdemande.findIndex((d: Demande) => d.id === demande.id);
            if (index !== -1) {
              this.listdemande.splice(index, 1);
              this.filteredListDemande = this.filteredListDemande.filter((d: Demande) => d.id !== demande.id);
            }
            this.filterDemandes();
          },
          (error: any) => {
            console.log(error);
          }
        );
      }
    });
  }


  openDemandeModal(demande: Demande): void {
    const demandeId = demande.id;
    this.router.navigate(['/main/consulterdemande/', demandeId]);
  }
}
