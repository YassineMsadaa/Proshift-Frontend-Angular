import { Component, OnInit,Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { DepartementType } from 'src/app/models/enums/departementType';
import { EtatCivilType } from 'src/app/models/enums/etatCivileType';
import { PosteType } from 'src/app/models/enums/posteType';
import { User } from 'src/app/models/user';
import { EvenementService } from 'src/app/services/evenement.service';

@Component({
  selector: 'app-update-employe',
  templateUrl: './update-employe.component.html',
  styleUrls: ['./update-employe.component.css']
})
export class UpdateEmployeComponent implements OnInit {
  @Input() user: User | null = null;
  userForm!:FormGroup;
  updatedUser: User=new User();

  /*Departement */ 
  departementOptionValues =DepartementType;
  departementEnumKeys:any[]=[];

    /*Etat Civile */ 
    etatCivileOptionValues =EtatCivilType;
    etatCivileEnumKeys:any[]=[];

      /*Poste */ 
  posteOptionValues =PosteType;
  posteEnumKeys:any[]=[];
  constructor(private evenementService:EvenementService) { }

  ngOnInit(): void {
    this.departementEnumKeys = Object.keys(this.departementOptionValues).filter(String);
    this.posteEnumKeys = Object.keys(this.posteOptionValues).filter(String);
    this.etatCivileEnumKeys = Object.keys(this.etatCivileOptionValues).filter(String);

    this.userForm = new FormGroup({
      id: new FormControl(this.user?.id),
  nom: new FormControl(this.user?.nom, Validators.required),
  prenom: new FormControl(this.user?.prenom, Validators.required),
  cin: new FormControl(this.user?.cin, Validators.required),
  roles: new FormControl(this.user?.roles),
  departement: new FormControl(this.user?.departement, Validators.required),
  dateEmbauche: new FormControl(this.user?.dateEmbauche, [Validators.required, this.dateLessThanOrEqualTodayValidator]),
  numTelephone: new FormControl(this.user?.numTelephone, Validators.required),
  matricule: new FormControl(this.user?.matricule, Validators.required),
  poste: new FormControl(this.user?.poste, Validators.required),
  etatCivil: new FormControl(this.user?.etatCivil, Validators.required),
  adresse: new FormControl(this.user?.adresse, Validators.required),
  dateNaissance: new FormControl(this.user?.dateNaissance, [Validators.required, this.dateLessThanTodayValidator]),
  email: new FormControl(this.user?.email, [Validators.required, Validators.email]),


    });
  }
  updateUser(){
    console.log(this.userForm);
       //console.log(this.noteForm.value.coordinateur);
       this.updatedUser.id = this.userForm.value.id;
       this.updatedUser.nom = this.userForm.value.nom;
       this.updatedUser.prenom = this.userForm.value.prenom;
       //this.updatedUser.roles = this.userForm.value.roles;
       this.updatedUser.cin = this.userForm.value.cin;
       this.updatedUser.departement = this.userForm.value.departement;
       this.updatedUser.dateEmbauche = this.userForm.value.dateEmbauche;
       this.updatedUser.numTelephone = this.userForm.value.numTelephone;
       this.updatedUser.matricule = this.userForm.value.matricule;
       this.updatedUser.poste = this.userForm.value.poste;
       this.updatedUser.etatCivil = this.userForm.value.etatCivil;
       this.updatedUser.adresse = this.userForm.value.adresse;
       this.updatedUser.dateNaissance = this.userForm.value.dateNaissance;
       this.updatedUser.email = this.userForm.value.email;

   this.evenementService.updateemployee(this.updatedUser).subscribe(data => {
         console.log(data);
       });
       console.log(this.updatedUser);
  }

// Custom validator function to check if a date is less than today
 dateLessThanTodayValidator(control: AbstractControl): { [key: string]: any } | null {
  const selectedDate = new Date(control.value);
  const today = new Date();

  if (selectedDate >= today) {
    return { dateLessThanToday: true };
  }

  return null;
}

// Custom validator function to check if a date is less than or equal to today
 dateLessThanOrEqualTodayValidator(control: AbstractControl): { [key: string]: any } | null {
  const selectedDate = new Date(control.value);
  const today = new Date();

  if (selectedDate > today) {
    return { dateLessThanOrEqualToday: true };
  }

  return null;
}

}
