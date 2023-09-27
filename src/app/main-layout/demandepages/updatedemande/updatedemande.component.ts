import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Demande } from '../../../models/demande';
import { DemandeService } from '../../../services/demande.service';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updatedemande',
  templateUrl: './updatedemande.component.html',
  styleUrls: ['./updatedemande.component.css'],
})
export class UpdatedemandeComponent implements OnInit {
  demandeForm!: FormGroup;
  demande!: Demande;
  soldConge!: number;
  nombrejour!: number;
  user!: User;

  constructor(
    private formBuilder: FormBuilder,
    private demandeService: DemandeService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.demandeForm = this.formBuilder.group({
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      type: ['', Validators.required],
      motif: [''],
      file: [''],
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));
    const userid = localStorage.getItem('id');
    if (userid) {
      this.userService.getUserById(parseInt(userid.toString())).subscribe(
        (user: User) => {
          this.user = user;
          if (user && user.congeSolde) {
            this.soldConge = parseInt(user.congeSolde.toString());
          }
        },
        (error) => {
          // Handle error response
        }
      );
    }
    this.getDemandeById(id);
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    return currentDate.toISOString().split('T')[0];
  }

  getTomorrowDate(): string {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }

  getDemandeById(id: number) {
    this.demandeService.getDemandeById(id).subscribe(
      (data) => {
        this.demande = data;
        this.demandeForm.patchValue({
          dateDebut: this.demande.dateDebut,
          dateFin: this.demande.dateFin,
          type: this.demande.type,
          motif: this.demande.motif,
        });
        this.calculateTotalJours();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateDemande() {
    if (this.demandeForm.valid) {
      const updatedDemande: Demande = {
        ...this.demande, // Include the existing demande properties
        dateDebut: this.demandeForm.value.dateDebut,
        dateFin: this.demandeForm.value.dateFin,
        type: this.demandeForm.value.type,
        motif: this.demandeForm.value.motif,
      };

      this.demandeService.updateDemande(this.demande.id, updatedDemande).subscribe(
        (data) => {
          Swal.fire('Succès', 'Demande mise à jour avec succès', 'success').then(() => {
            // Redirect to "Mes demandes" list
            this.router.navigate(['/main/mesdemandes']);
          });
        },
        (error) => {
          Swal.fire('Erreur', 'Une erreur s\'est produite lors de la mise à jour de la demande', 'error');
          console.log(error);
        }
      );
    }
  }

  calculateTotalJours() {
    const startDate = new Date(this.demandeForm.value.dateDebut);
    const endDate = new Date(this.demandeForm.value.dateFin);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    this.nombrejour = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}
