import { Component, OnInit, Signal, inject } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  private readonly userService = inject(UserService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router)
  users = toSignal(this.userService.getUsers());
  pictureProfileUser = toSignal;
  profilPicture!: string;

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }

  getProfilePicture(userId: number) {
    console.log('icicicicci');
  }
}
