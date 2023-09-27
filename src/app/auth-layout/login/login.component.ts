import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private activeroute: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', Validators.required]
    });
  }

  ngOnDestroy() {}

  onSubmit() {
    if (this.loginForm.invalid) {
      if (this.loginForm.get('username')?.hasError('required')) {
        Swal.fire({
          icon: 'warning',
          title: 'Username manquant!',
          text: 'Veuillez entrer le username'
        });
      }
      if (this.loginForm.get('username')?.hasError('minlength')) {
        Swal.fire({
          icon: 'warning',
          title: 'Petit Username.',
          text: 'le Username doit contenir 3 lettres ou plus'
        });
      }
      if (this.loginForm.get('password')?.hasError('required')) {
        Swal.fire({
          icon: 'warning',
          title: 'Mot de passe manquant',
          text: 'Veuillez entrer le mot de passe'
        });
      }
      return;
    }

    this.authService.signin(this.loginForm.value).subscribe(
      (res: any) => {
        console.log('response', res);
        if (true) {
          localStorage.setItem('id', res.id);
          localStorage.setItem('email', res.email);
          localStorage.setItem('username', res.username);
          localStorage.setItem('user',res.user);
          localStorage.setItem('role', res.roles);
          localStorage.setItem('token', res.accessToken);
          this.route.navigateByUrl('/main/home');
        }
      },
      (error: any) => {
        let errorMessage = 'An error occurred. Please try again.';
        if (error && error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        Swal.fire({
          icon: 'error',
          title: 'Authentication Failed',
          text: errorMessage
        });
        console.log(error);
      }
    );
  }
}
