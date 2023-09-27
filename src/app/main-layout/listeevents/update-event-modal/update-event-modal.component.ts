import { Component, Input, OnInit } from '@angular/core';
import { EvenementType } from 'src/app/models/enums/evenementType';
import { Evenement } from 'src/app/models/event';
import { EvenementService } from 'src/app/services/evenement.service';
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-update-event-modal',
  templateUrl: './update-event-modal.component.html',
  styleUrls: ['./update-event-modal.component.css']
})
export class UpdateEventModalComponent implements OnInit {
  @Input() event: Evenement | null = null;
  e!:Evenement;
  @Input() eventForm: any;
  optionValues =EvenementType;
  enumKeys:any[]=[];
  listemployee!: any[];
  selectedUsersIds: string[] = [];
  selectedOption: string = "Selectionner un type" ;

  constructor(private evenementService:EvenementService,private userService:UserService) {

   }

  ngOnInit(): void {
    this.enumKeys = Object.keys(this.optionValues).filter(String);
    this.getallemployee();
    this.e = new Evenement();

  }
  updateEvent() {
    this.selectedUsersIds=this.eventForm.value.selectedUsers;
    const transformedArray = this.selectedUsersIds.map(id => ({

     invitee: {
      id: id
     }
   }));
   console.log(this.eventForm.value.id);
   this.e.id=this.eventForm.value.id;
     this.e.eventName = this.eventForm.value.eventName;
     this.e.type = this.eventForm.value.type;
     this.e.coordinateur.id = this.eventForm.value.coordinateur;
     this.e.datetime=this.eventForm.value.datetime;
     this.e.invitations = transformedArray;
       this.evenementService.update(this.e).subscribe(data => {
       console.log(data);

     });

   }

  getallemployee()
  {
    this.userService.getAllUsers().subscribe((res:any)=>{
      this.listemployee=res;
    })

  }
}
