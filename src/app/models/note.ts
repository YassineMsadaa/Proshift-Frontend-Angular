
import { User } from "./user";

export class Note {
  id!: number;
  titre!: String;
  description!: String;
  dateCreation!: Date;
  coordinateur: User= new User();;
}
