import { Component, OnInit } from '@angular/core';
import {MembreService} from "../../../services/membre.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-create-membre',
  templateUrl: './create-membre.component.html',
  styleUrls: ['./create-membre.component.css']
})
export class CreateMembreComponent implements OnInit {
  newMember: any = {
    cin: '',
    nom: '',
    prenom: '',
    role: ''
  }; // Object to hold the form data

  constructor(private membreService: MembreService) {}

  ngOnInit() {
  }

  onSubmit(): void {
    // Perform form validation
    if (!this.newMember.cin || !this.newMember.name || !this.newMember.lastName || !this.newMember.role) {
      Swal.fire('Erreur', 'Veuillez remplir tous les champs.', 'error');
      return;
    }
    console.log(this.newMember)
    // Perform the necessary logic when the form is submitted
    this.membreService.createMembre(this.newMember).subscribe(
      response => {
        // Handle the success response
        Swal.fire('Succès', 'Le membre a été ajouté avec succès.', 'success');
        console.log('Member added successfully:', response);
        // Reset the form fields
        this.newMember = {
          cin: '',
          name: '',
          lastName: '',
          role: ''
        };
      },
      error => {
        // Handle the error response
        Swal.fire('Erreur', 'Ce numero CIN deja exist.', 'error');
        console.error('Failed to add member:', error);
      }
    );
  }
}
