import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSelectSearchComponent } from './form-select-search.component';

describe('FormSelectSearchComponent', () => {
  let component: FormSelectSearchComponent;
  let fixture: ComponentFixture<FormSelectSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSelectSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSelectSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
