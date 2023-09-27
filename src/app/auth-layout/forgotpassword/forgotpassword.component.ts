import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  forgotpasswordForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: AuthService
  ) { }

  ngOnInit() {
    this.forgotpasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgotpasswordForm.invalid) {
      return;
    }

    const email = this.forgotpasswordForm.value.email;
    this.userService.forgotPassword(email).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'Email envoyer',
          text: 'veuillez vérifier votre e-mail pour changer votre mot de passe!',
        })
      },(error: any) => {
        let errorMessage = 'An error occurred. Please try again.';
        if (error && error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        Swal.fire({
          icon: 'error',
          title: 'forgotpassword Failed',
          text: errorMessage
        });
        console.log(error);
      }
    );
  }
}
