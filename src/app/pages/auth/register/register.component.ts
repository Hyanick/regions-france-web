import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule
  ],
})
export class RegisterComponent {
  registerForm: FormGroup;
  private readonly authService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  activationMode: 'link' | 'code' | 'phone' = 'link'; // Par défaut : mode lien
  isPageConfirmationSendedMail = false;
  errorMessage: string = '';

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        activationMode: ['link', Validators.required], // Par défaut, via lien
      },
      {
        validators: [this.matchEmails, this.matchPasswords], // Custom validators
      }
    );
  }

  // Validator to check if emails match
  private matchEmails(group: AbstractControl): ValidationErrors | null {
    const email = group.get('email')?.value;
    const confirmEmail = group.get('confirmEmail')?.value;

    if (email && confirmEmail && email !== confirmEmail) {
      group.get('confirmEmail')?.setErrors({ emailsMismatch: true }); // Important
      return { emailsMismatch: true }; // Error name
    }
    return null;
  }

  // Validator to check if passwords match
  private matchPasswords(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      group.get('confirmPassword')?.setErrors({ passwordsMismatch: true }); // Important
      return { passwordsMismatch: true }; // Error name
    }
    return null;
  }

  onActivationModeChange(mode: 'link' | 'code' | 'phone', isChecked: boolean): void {
    if (isChecked) {
      this.activationMode = mode;
      this.registerForm.patchValue({ activationMode: mode });
    }
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { firstName, lastName, email, password } = this.registerForm.value;
      console.log('Registering with:', {
        firstName,
        lastName,
        email,
        password,
      });
      // TODO: Call your registration API
      this.authService
        .regsiter(this.registerForm.value)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (response) => {
            console.log('response', response);
            if(this.activationMode === 'code') {
              this.router.navigate(['/verify'], { queryParams: { userId: response.userId } })
            } else if(this.activationMode === 'link') {
              {
                  this.isPageConfirmationSendedMail = true
              }

            } else {

            }
            
            

            // Rediriger vers la page de vérification avec l'ID de l'utilisateur
           // this.router.navigate(['/verify'], { queryParams: { userId: response.userId } });
           // this.router.navigate(['/verify-account'], { queryParams: { token: response.token } });

          },
          error: (err) => {
            console.error('error', err.message);
            this.errorMessage = err.message;  // Affiche l'erreur interceptée
          },
          complete: () => console.log('User register'),
        });
    } else {
      console.error('Form is invalid');
    }
  }
}
