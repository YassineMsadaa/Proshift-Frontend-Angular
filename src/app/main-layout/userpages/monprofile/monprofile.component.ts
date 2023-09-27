import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../../../services/user.service";
import { User } from "../../../models/user";
import Swal from "sweetalert2";
import { PresenceService } from "../../../services/presence.service";

@Component({
  selector: 'app-monprofile',
  templateUrl: './monprofile.component.html',
  styleUrls: ['./monprofile.component.css']
})
export class MonprofileComponent implements OnInit {
  id: any;
  email: any;
  username: any;
  user!: User;
  userform!: FormGroup;
  local: any;
  role: any;
  checked: boolean = false;

  constructor(
    private userService: UserService,
    private presenceService: PresenceService,
    private activeroute: ActivatedRoute,
    private formbuilder: FormBuilder
  ) {
    this.userform = this.formbuilder.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      numTelephone: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.email = localStorage.getItem('email');
    this.id = localStorage.getItem('id');

    this.getone();
  }

  getone() {
    this.userService.getUserById(this.id).subscribe((res: any) => {
      this.user = res;
      this.checked = this.user.checkin !== null;
      console.log(res);
      console.log("details user", this.user);
      this.userform.patchValue({
        email: this.user.email,
        username: this.user.username,
        password: this.user.password,
        numTelephone: this.user.numTelephone,
      });
    });
  }

  Update() {
    console.log(this.userform.value);
    this.user.id = this.id;
    this.user.email = this.userform.value.email;
    this.user.username = this.userform.value.username;
    this.user.numTelephone = this.userform.value.numTelephone;
    this.userService.updateUser(this.user).subscribe((res: any) => {
      console.log("list of user", res);
      this.showSuccessAlert();
    });
  }

  onToggleClick() {
    if (this.user.checkin) {
      console.log(this.user.id)
      this.presenceService.createPresence(this.user.id).subscribe((res: any) => {
        this.user.checkin = null;
        console.log("Presence created successfully");
      });
    } else {
      this.userService.checkIn(this.user.id).subscribe((res: any) => {
        this.user.checkin= new Date();
        console.log("Checked in successfully");
      });
    }
  }

  showSuccessAlert() {
    Swal.fire('Modifié avec succès', '', 'success');
  }

  Activepropostion() {
    // Perform actions for "Activé" button click
    // ...
  }

  disabledpropostion() {
    // Perform actions for "Desactiver" button click
    // ...
  }
}
