import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormSelectComponent } from './pages/form-select/form-select.component';
import { FormSelectSearchComponent } from './pages/form-select-search/form-select-search.component';
import { FormSelectAutocompleteComponent } from './pages/form-select-autocomplete/form-select-autocomplete.component';
import { UserListComponent } from './pages/user/user-list/user-list.component';
import { UserProfileFormComponent } from './pages/user/user-profile-form/user-profile-form.component';

@Component({
  selector: 'app-root',
  imports: [FormSelectComponent, FormSelectSearchComponent, FormSelectAutocompleteComponent, UserListComponent, UserProfileFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'regions-france-web';
}
