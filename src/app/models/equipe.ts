import {User} from "./user";
import {Projet} from "./projet";

export class Equipe {
  id!: number;
  name!: string;
  dateCreation!: Date;
  projectMaster!: User;
  employees!: User[];
  projects!: Projet[];
}
