import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators , AbstractControl } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.css']
})
export class NewpasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  code: any;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.code = this.route.snapshot.paramMap.get('code');
    this.resetPasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    }, { validators: this.passwordMatchValidator });
  }

  ngOnDestroy() {
  }

  resetPassword() {
    if (this.resetPasswordForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Veuillez verifier le mot de passe.'
      });
      return;
    }

    const password = this.resetPasswordForm.get('password')?.value;
    this.authService.resetPassword(password, this.code).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Réinitialisation du mot de passe réussie',
          text: 'Le mot de passe a été modifié avec succès !'
        }).then(() => {
          // Redirect to the desired page after successful password reset
          this.router.navigate(['/login']);
        });
      },
      error => {
        let errorMessage = 'Une erreur s\'est produite. Veuillez réessayer.';
        if (error && error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        Swal.fire({
          icon: 'error',
          title: 'Échec de la réinitialisation du mot de passe',
          text: errorMessage
        });
        console.log(error);
      }
    );
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return null;
  }
}
