import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { EvenementService } from 'src/app/services/evenement.service';
import { UpdateEmployeComponent } from './update-employe/update-employe.component';

@Component({
  selector: 'app-listeemploye',
  templateUrl: './listeemploye.component.html',
  styleUrls: ['./listeemploye.component.css']
})
export class ListeemployeComponent implements OnInit {
  listemployee:any;
  user:any=null;
  constructor(private evenementService:EvenementService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getallemployee();
  }
   
  getallemployee()
  {
    this.evenementService.getemployee().subscribe((res:any)=>{
      this.listemployee=res;
      console.log(res);
    })
  
  }
  OpenUpdateModal(user: User) {
    if (!user) {
      // Handle the case when note is undefined
      return;
    }
  
    this.user = user; // Set the note value
  
    // Open the modal
    const modalRef = this.modalService.open(UpdateEmployeComponent);
    modalRef.componentInstance.user = this.user; // Pass the note value to the modal component

    modalRef.result
    .then((result) => {
      console.log(result); // You can access the result of the modal here
    })
    .catch((reason) => {
      console.log(reason); // Handle the case when the modal is dismissed or closed without a result
    });
  
   // modalRef.componentInstance.note = note; // Pass the note value to the modal component
  
  }
}
