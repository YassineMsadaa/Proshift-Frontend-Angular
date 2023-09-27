import { Component } from '@angular/core';import { Projet } from "../../../models/projet";
import { Etat } from "../../../models/etat";
import { ProjetService } from "../../../services/projet.service";
import { Router } from "@angular/router";
import Swal from 'sweetalert2';
import { User } from "../../../models/user";
import { UserService } from "../../../services/user.service";

@Component({
  selector: 'app-creeprojet',
  templateUrl: './creeprojet.component.html',
  styleUrls: ['./creeprojet.component.css']
})
export class CreeprojetComponent {
  newProjet: Projet = new Projet();
  user!: User;

  constructor(
    private projetService: ProjetService,
    private userService: UserService,
    private router: Router
  ) {}

  onSubmit(): void {
    // Find user from local storage
    const id = localStorage.getItem('id');
    if (id) {
      this.userService.getUserById(parseInt(id)).subscribe(
        (user: User) => {
          this.user = user;
          this.newProjet.chef = this.user;

          // Validate input fields
          if (
            !this.newProjet.dateDebut ||
            !this.newProjet.dateFinEstimee ||
            !this.newProjet.nom ||
            !this.newProjet.description
          ) {
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: 'Veuillez remplir tous les champs',
              confirmButtonText: 'OK',
              confirmButtonColor: '#3085d6',
            });
            return;
          }

          this.projetService.createProjet(this.newProjet).subscribe(
            (response: Projet) => {
              Swal.fire({
                icon: 'success',
                title: 'Succès',
                text: 'Projet créé avec succès',
                confirmButtonText: 'OK',
                confirmButtonColor: '#3085d6',
              }).then(() => {
                // Navigate to the project list page
                this.router.navigateByUrl('/main/listprojet');
              });
            },
            (error: any) => {
              // Handle error from the API response
              Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Une erreur est survenue lors de la création du projet',
                confirmButtonText: 'OK',
                confirmButtonColor: '#3085d6',
              });
              console.log(error);
            }
          );
        },
        (error: any) => {
          // Handle error if user is not found by id
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Utilisateur introuvable',
            confirmButtonText: 'OK',
            confirmButtonColor: '#3085d6',
          });
          console.log(error);
        }
      );
    } else {
      // Handle error if user id is not found in local storage
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Utilisateur introuvable',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6',
      });
      return;
    }
  }
}
