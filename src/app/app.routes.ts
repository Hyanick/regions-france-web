import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { UserListComponent } from './pages/user/user-list/user-list.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes =  [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {path: 'user-list', component: UserListComponent, canActivate: [authGuard]},
   { path: '', redirectTo: 'login', pathMatch: 'full' },
  ];;
