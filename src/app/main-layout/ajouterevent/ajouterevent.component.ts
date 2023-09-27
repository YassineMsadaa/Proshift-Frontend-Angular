import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EvenementType } from 'src/app/models/enums/evenementType';
import { Evenement } from 'src/app/models/event';
import { EvenementService } from 'src/app/services/evenement.service';
import Swal from 'sweetalert2';
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-ajouterevent',
  templateUrl: './ajouterevent.component.html',
  styleUrls: ['./ajouterevent.component.css']
})
export class AjoutereventComponent implements OnInit {
  event!: Evenement;
  noteForm!: FormGroup;
  selectedOption: string = "Selectionner un type";
  listemployee!: any[];

  selectedUsersIds: string[] = [];
  optionValues = EvenementType;
  enumKeys: any[] = [];
  constructor(private router: Router, private evenementService: EvenementService, private userService: UserService) { }

  ngOnInit(): void {
    this.enumKeys = Object.keys(this.optionValues).filter(String);
    this.getallemployee();

    this.event = new Evenement();
    this.noteForm = new FormGroup({
      type: new FormControl(null, Validators.required),
      eventName: new FormControl(null, Validators.required),
      coordinateur: new FormControl(null, Validators.required),
      selectedUsers: new FormControl([], Validators.required),
      datetime: new FormControl(null, [Validators.required, this.dateGreaterThanOrEqualTodayValidator])
    });
  }

  getallemployee() {
    this.userService.getAllUsers().subscribe((res: any) => {
      this.listemployee = res;
    });
  }

  // Custom validator function to check if a date is greater than or equal to today
  dateGreaterThanOrEqualTodayValidator(control: AbstractControl): { [key: string]: any } | null {
    const selectedDate = new Date(control.value);
    const today = new Date();

    if (selectedDate < today) {
      return { dateGreaterThanOrEqualToday: true };
    }

    return null;
  }

  createNote() {
    this.selectedUsersIds = this.noteForm.value.selectedUsers;
    const transformedArray = this.selectedUsersIds.map(id => ({
      invitee: {
        id: id
      }
    }));

    this.event.eventName = this.noteForm.value.eventName;
    this.event.type = this.noteForm.value.type;
    this.event.coordinateur.id = this.noteForm.value.coordinateur;
    this.event.datetime = this.noteForm.value.datetime;
    this.event.invitations = transformedArray;

    this.evenementService.add(this.event).subscribe(data => {
      console.log(data);
      this.showSuccessAlert();
      this.router.navigate(['/main/listeevents']); // Redirect to the list page
    });
  }

  showSuccessAlert() {
    Swal.fire('Ajouté avec succès', '', 'success');
  }

  showErerrAlert() {
    Swal.fire('Incorrect...', 'You failed!', 'error');
  }
}
