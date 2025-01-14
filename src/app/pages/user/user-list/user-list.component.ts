import { Component, OnInit, Signal, inject } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  private readonly userService = inject(UserService);
  users = toSignal(this.userService.getUsers());
  pictureProfileUser = toSignal
  profilPicture!: string

ngOnInit(): void {
 
  
}

getProfilePicture(userId: number) {
  console.log('icicicicci');
  

}

}
