import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-verify-account',
  imports: [CommonModule],
  templateUrl: './verify-account.component.html',
  styleUrl: './verify-account.component.scss'
})
export class VerifyAccountComponent implements OnInit {
  verificationStatus: 'pending' | 'success' | 'error' = 'pending';
  message: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    console.log('token', token);
    

    if (token) {
      this.authService.verifyAccount(token).subscribe({
        next: () => {
          this.verificationStatus = 'success';
          this.message = 'Votre compte a été vérifié avec succès !';
          // Redirection après un délai
          setTimeout(() => this.router.navigate(['/login']), 6000);
        },
        error: (err) => {
         console.error('err Token', err)
          this.verificationStatus = 'error';
          this.message = 'La vérification a échoué. Le lien est peut-être expiré ou invalide.';
        },
      });
    } else {
      this.verificationStatus = 'error';
      this.message = 'Aucun token de vérification fourni.';
    }
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
