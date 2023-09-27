import { Component, OnInit } from '@angular/core';
import { UserService } from "../../../services/user.service";
import { User } from "../../../models/user";
import { FormBuilder, FormGroup } from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import { Role } from "../../../models/role";
import { DateOnlyPipe } from "../../../pipes/date-only.pipe";
import { DateuserPipe } from "../../../pipes/dateuser.pipe";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modifieruser',
  templateUrl: './modifieruser.component.html',
  styleUrls: ['./modifieruser.component.css']
})
export class ModifieruserComponent implements OnInit {
  user!: User;
  userForm!: FormGroup;
  roles: Role[] = [];

  constructor(
    private dateuser: DateuserPipe,
    private route: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const userid = params['userid'];
      this.loadUser(userid);
    });
    this.createForm();
  }

  loadUser(userid: any) {
    this.userService.getUserById(userid).subscribe(
      (response: any) => {
        this.user = response;
        this.loadFormData();
      },
      (error: any) => {
        console.error('Error while loading user:', error);
      }
    );
  }

  createForm() {
    this.userForm = this.formBuilder.group({
      nom: [''],
      prenom: [''],
      email: [''],
      roles: [''],
      cin: [''],
      dateNaissance: [''],
      numTelephone: [''],
      adresse: [''],
      dateEmbauche: [''],
      urgenceNom: [''],
      urgenceNum: [''],
      congeSolde: [''],
      poste: [''],
      etatCivil: [''],
      departement: [''],
      approved: [false],
      blocked: [false]
    });
  }

  loadFormData() {
    if (this.user) {
      this.roles = [];

      for (const role of this.user.roles) {
        const newRole: Role = {
          name: role.name
        };
        this.roles.push(newRole);
      }

      this.userForm.patchValue({
        nom: this.user.nom,
        prenom: this.user.prenom,
        email: this.user.email,
        roles: this.user.roles[0].name,
        cin: this.user.cin,
        dateNaissance: this.dateuser.transform(this.user.dateNaissance), // Format the date to "yyyy-MM-dd"
        dateEmbauche: this.dateuser.transform(this.user.dateEmbauche),
        numTelephone: this.user.numTelephone,
        adresse: this.user.adresse,
        urgenceNom: this.user.urgenceNom,
        urgenceNum: this.user.urgenceNum,
        congeSolde: this.user.congeSolde,
        poste: this.user.poste,
        etatCivil: this.user.etatCivil,
        departement: this.user.departement,
        approved: this.user.approved,
        blocked: this.user.blocked
      });
    }
  }

  updateUser() {
    const updatedUser = this.userForm.value;

    this.user.nom = updatedUser.nom;
    this.user.prenom = updatedUser.prenom;
    this.user.email = updatedUser.email;

    // Retrieve the selected role and assign it to the user object
    const selectedRole: Role = { name: updatedUser.roles };
    this.user.roles = [selectedRole];

    this.user.cin = updatedUser.cin;
    this.user.dateNaissance = updatedUser.dateNaissance;
    this.user.numTelephone = updatedUser.numTelephone;
    this.user.adresse = updatedUser.adresse;
    this.user.dateEmbauche = updatedUser.dateEmbauche;
    this.user.urgenceNom = updatedUser.urgenceNom;
    this.user.urgenceNum = updatedUser.urgenceNum;
    this.user.congeSolde = updatedUser.congeSolde;
    // Add the missing properties to update
    this.user.poste = updatedUser.poste;
    this.user.etatCivil = updatedUser.etatCivil;
    this.user.departement = updatedUser.departement;
    console.log(updatedUser.etatCivil)
    console.log(this.user.departement)
    this.user.approved = updatedUser.approved;
    this.user.blocked = updatedUser.blocked;

    this.userService.updateUser(this.user).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Mise à jour réussie',
          text: 'Le profil utilisateur a été mis à jour avec succès.',
          confirmButtonText: 'OK',
          confirmButtonColor: '#3085d6',
        }).then((resultre) => {
          this.router.navigate(['/main/userlist']);
        });
      },
      (error) => {
        // Handle error
      }
    );
  }
}
