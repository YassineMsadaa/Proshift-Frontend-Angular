import {User} from "./user";

export class Demande {
  id!: number;
  type!: String;
  dateCreation!: Date;
  dateDebut!: Date;
  dateFin!: Date;
  motif!: String;
  user!: User;
  status!: String;
  nombreJours!:number
}
