import {Projet} from "./projet";
import {User} from "./user";
import {Priorite} from "./enums/priorite";

export class Tache {
  id!: number;
  name!: string;
  description!: string;
  done!: boolean;
  dateCreation!: Date;
  dateFin!: Date;
  dateFinEstimee!: Date;
  dateAssignation!: Date;
  priorite!: Priorite;
  projet!: Projet;
  employee!: User;
}
