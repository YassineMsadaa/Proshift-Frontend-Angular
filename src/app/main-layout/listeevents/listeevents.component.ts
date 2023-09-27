import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Evenement } from 'src/app/models/event';
import { EvenementService } from 'src/app/services/evenement.service';
import { UpdateEventModalComponent } from './update-event-modal/update-event-modal.component';
import { ConsulterEventModalComponent } from './consulter-event-modal/consulter-event-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listeevents',
  templateUrl: './listeevents.component.html',
  styleUrls: ['./listeevents.component.css']
})
export class ListeeventsComponent implements OnInit {
  liste: any;
  event: Evenement | null = null;
  eventForm: FormGroup;

  @ViewChild('noteModal') noteModal: any;
  @ViewChild('updateModal') updateModal: any;

  constructor(private eventService: EvenementService, private modalService: NgbModal) {
    this.eventForm = new FormGroup({
      id: new FormControl(),
      eventName: new FormControl('', Validators.required),
      datetime: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      dateCreation: new FormControl(),
      coordinateur: new FormControl('', Validators.required),
      selectedUsers: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.getall();
  }

  getall(): void {
    this.eventService.getAll().subscribe((res: any) => {
      this.liste = res;
      console.log("list of event", this.liste);
    });
  }

  delete(event: any): void {
    this.event=event;

    if (!this.event) {
      return;
    }
    if(this.event)
      console.log(this.event.id)
    Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir supprimer cet événement ?',
      text: "Cette action est irréversible.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        if(this.event)
          console.log(this.event.id);
        if(this.event)
        this.eventService.delete(this.event.id).subscribe(() => {
          Swal.fire('Supprimé', 'L\'événement a été supprimé avec succès.', 'success');
          this.getall();
        }, (error) => {
          Swal.fire('Erreur', 'Une erreur est survenue lors de la suppression de l\'événement.', 'error');
        });
      }
    });
  }


  openUpdateModal(event: Evenement): void {
    if (!event) {
      return;
    }

    this.eventForm.setValue({
      id: event.id,
      eventName: event.eventName,
      datetime: event.datetime,
      type: event.type,
      dateCreation: event.dateCreation,
      coordinateur: event.coordinateur,
      selectedUsers: event.invitations,
    });

    this.event = event;

    const modalRef = this.modalService.open(UpdateEventModalComponent);
    modalRef.componentInstance.event = this.event;
    modalRef.componentInstance.eventForm = this.eventForm;

    modalRef.result
      .then((result) => {
        console.log(result);
      })
      .catch((reason) => {
        console.log(reason);
      });

    console.log(modalRef.componentInstance.note);
  }

  openDetailsModal(event: Evenement): void {
    if (!event) {
      return;
    }

    this.event = event;

    const modalRef = this.modalService.open(ConsulterEventModalComponent);
    modalRef.componentInstance.event = this.event;

    modalRef.result
      .then((result) => {
        console.log(result);
      })
      .catch((reason) => {
        console.log(reason);
      });
  }
}
