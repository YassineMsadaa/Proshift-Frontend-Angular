
import { User } from "./user";

export class Invitation {
  id!: number;
  titre!: String;
  status!: String;
  dateCreation!: Date;
  invitee: User= new User();
}
