import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { User } from '../../../models/user.model';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrl: './user-profil.component.scss',
  imports: [CommonModule, MatCardModule, MatTabsModule, MatIconModule, MatButton],
})
export class UserProfilComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  user!: User;

  ngOnInit(): void {
    this.userService
      .getUserProfile()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        console.log('data ->>>', data);

        this.user = data; // Charger les données de l'utilisateur
      });
  }

  onEditProfile() {
    this.router.navigate(['edit-profile'])
  }

  onDeleteAccount() {
    alert('Fonctionnalité à implémenter : Supprimer le compte');
  }
}
