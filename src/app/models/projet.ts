import { User } from "./user";
import { Equipe } from "./equipe";
import { Tache } from "./tache";
import { Etat } from "./etat";

export class Projet {
  id!: number;
  nom!: string;
  dateFinEstimee!: Date;
  dateFin!: Date;
  dateDebut!: Date;
  description!: string;
  etat!: Etat;
  dateCreation!: Date;
  chef!: User;
  equipe!: Equipe;
  taches!: Tache[];
}
