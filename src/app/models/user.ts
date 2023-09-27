import { Role } from "./role";
import {Departement} from "./departement";
import {EtatCivil} from "./etatCivil";
import {Poste} from "./poste";
import {Equipe} from "./equipe";

export class User {
  id!: number;
  username!: String;
  email!: String;
  password!: String;
  roles : Role[] = [];
  cin!: String;
  resetPasswordToken!:String;
  verificationCode !:String;
  blocked!:boolean;
  matricule!:String;
  nom!:String;
  prenom!:String;
  dateNaissance!:Date;
  numTelephone!:number;
  adresse!:String;
  dateEmbauche!:Date;
  urgenceNom!:String;
  urgenceNum!:number;
  congeSolde!:String;
  checkin!:Date|null;
  approved!:boolean;
  dateCreation!:Date;
  poste!:Poste;
  etatCivil!:EtatCivil;
  departement!:Departement;
  statut!:boolean;
  equipe!:Equipe;

}
