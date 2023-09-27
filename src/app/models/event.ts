
import { Invitation } from "./invitation";
import { User } from "./user";

export class Evenement {
  id!: number;
  eventName!: String;
  type!: String;
  dateCreation!: Date;
  datetime!:Date;
  coordinateur: User= new User();
  invitations: any[]=[]; 
}
