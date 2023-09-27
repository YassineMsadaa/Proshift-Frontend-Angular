import {User} from "./user";

export class Presence {
  id!: number;
  dateCreation!: Date;
  checkInTime!: Date;
  checkOutTime!: Date;
  hoursWorked!: number;
  user!: User;
}
