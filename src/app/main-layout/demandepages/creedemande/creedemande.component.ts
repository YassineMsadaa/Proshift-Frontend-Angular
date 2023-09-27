import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DemandeService} from "../../../services/demande.service";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";
import Swal from "sweetalert2";
import {Demande} from "../../../models/demande";

@Component({
  selector: 'app-creedemande',
  templateUrl: './creedemande.component.html',
  styleUrls: ['./creedemande.component.css']
})
export class CreedemandeComponent implements OnInit {
  demandeForm!: FormGroup;
  selectedOption!: string;
  nombrejour!: number;
  soldConge!: number;
  user!: User;

  constructor(
    private formBuilder: FormBuilder,
    private demandeService: DemandeService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.demandeForm = this.formBuilder.group({
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      type: ['', Validators.required],
      motif: ['', Validators.required],
      file: ['']
    });

    const userid = localStorage.getItem('id');
    if (userid) {
      this.userService.getUserById(parseInt(userid.toString())).subscribe(
        (user: User) => {
          this.user = user;
          this.soldConge = parseInt(user.congeSolde.toString());
        },
        (error) => {
          // Handle error response
        }
      );
    }
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

  calculateTotalJours(): void {
    const dateDebut = this.demandeForm.get('dateDebut')?.value;
    const dateFin = this.demandeForm.get('dateFin')?.value;

    if (dateDebut && dateFin) {
      const startDate = new Date(dateDebut);
      const endDate = new Date(dateFin);
      const timeDiff = endDate.getTime() - startDate.getTime();
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      this.nombrejour = diffDays;
    } else {
      this.nombrejour = 0;
    }
  }

  createDemande(): void {
    if (this.demandeForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Veuillez remplir tous les champs requis.'
      });
      return;
    }

    const demande: Demande = {
      id: 0, // Assign the appropriate value if applicable
      type: this.demandeForm.value.type,
      dateCreation: new Date(),
      dateDebut: new Date(this.demandeForm.value.dateDebut),
      dateFin: new Date(this.demandeForm.value.dateFin),
      motif: this.demandeForm.value.motif,
      user: this.user,
      status:  "En_attante",
      nombreJours: this.nombrejour
    };

    this.demandeService.createDemande(demande, this.user.id).subscribe(
      (response) => {
        console.log(response); // Log the response to check the returned data
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'La demande a été créée avec succès.'
        });
        // Handle success response
      },
      (error) => {
        console.log(error); // Log the error to see the details
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur s\'est produite lors de la création de la demande.'
        });
        // Handle error response
      }
    );
  }

}
