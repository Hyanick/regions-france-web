import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-verify',
  templateUrl: './user-verify-register.component.html',
  styleUrl: './user-verify-register.component.scss',
  imports: [ReactiveFormsModule, CommonModule],
})
export class VerifyComponent implements OnInit {
  code: string = '';
  userId!: number; // L'ID sera récupéré dynamiquement

  verificationForm!: FormGroup;
  errorMessage!: string;
  private readonly activatedRoute = inject(ActivatedRoute); // Pour accéder aux paramètres de l'URL
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {}

  ngOnInit(): void {
    this.verificationForm = this.fb.group({
      code: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
    });
    // Récupérer l'userId depuis les paramètres de l'URL
    this.activatedRoute.queryParams.subscribe((params) => {
      this.userId = params['userId'];
    });
  }

  onSubmit(): void {
    console.log('user', this.userId);
    console.log('code', this.code);
    if (this.verificationForm.valid) {
      const code = this.verificationForm.value.code;
      this.authService
        .verifyCode(this.userId, code)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.router.navigate(['/profile']); // Redirection après vérification réussie
          },
          error: (err) => {
            this.errorMessage = 'Le code est invalide ou a expiré.';
            console.error(err);
          },
        });
    }
  }
  resendCode() {
    this.authService
      .resendVerificationCode(+this.userId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => console.log('On reste sur la même page'),
        error: (err) => {
          console.error(err);
        },
      });
  }
}
