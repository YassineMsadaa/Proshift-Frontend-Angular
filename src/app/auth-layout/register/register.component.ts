import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      cin: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registrationForm.invalid) {
      if (this.registrationForm.get('username')?.hasError('required')) {
        Swal.fire({
          icon: 'warning',
          title: 'Username Required',
          text: 'Please enter a username.'
        });
      } else if (this.registrationForm.get('cin')?.hasError('required')) {
        Swal.fire({
          icon: 'warning',
          title: 'CIN Required',
          text: 'Please enter a CIN.'
        });
      } else if (this.registrationForm.get('cin')?.hasError('minlength')) {
        Swal.fire({
          icon: 'warning',
          title: 'Invalid CIN',
          text: 'CIN must be at least 8 characters long.'
        });
      } else if (this.registrationForm.get('cin')?.hasError('maxlength')) {
        Swal.fire({
          icon: 'warning',
          title: 'Invalid CIN',
          text: 'CIN cannot exceed 12 characters.'
        });
      } else if (this.registrationForm.get('email')?.hasError('required')) {
        Swal.fire({
          icon: 'warning',
          title: 'Email Required',
          text: 'Please enter an email address.'
        });
      } else if (this.registrationForm.get('email')?.hasError('email')) {
        Swal.fire({
          icon: 'warning',
          title: 'Invalid Email',
          text: 'Please enter a valid email address.'
        });
      } else if (this.registrationForm.get('password')?.hasError('required')) {
        Swal.fire({
          icon: 'warning',
          title: 'Password Required',
          text: 'Please enter a password.'
        });
      } else if (this.registrationForm.get('password')?.hasError('minlength')) {
        Swal.fire({
          icon: 'warning',
          title: 'Invalid Password',
          text: 'Password must be at least 6 characters long.'
        });
      } else if (this.registrationForm.get('confirmPassword')?.hasError('required')) {
        Swal.fire({
          icon: 'warning',
          title: 'Confirm Password Required',
          text: 'Please confirm your password.'
        });
      }
      return;
    }

    //registration
    const { username, cin, email, password } = this.registrationForm.value;
    this.authService.signup({ username, cin, email, password }).subscribe(
      () => {
        this.registrationForm.reset();
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'Please check your email to verify your account.'
        });
      },
      (error: any) => {
        let errorMessage = 'An error occurred. Please try again.';
        if (error && error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        Swal.fire({
          icon: 'error',
          title: 'registration Failed',
          text: errorMessage
        });
      }
    );
  }
}
