import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSelectAutocompleteComponent } from './form-select-autocomplete.component';

describe('FormSelectAutocompleteComponent', () => {
  let component: FormSelectAutocompleteComponent;
  let fixture: ComponentFixture<FormSelectAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSelectAutocompleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSelectAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
