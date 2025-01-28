import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeedetailsemployeeComponent } from './employeedetailsemployee.component';

describe('EmployeedetailsemployeeComponent', () => {
  let component: EmployeedetailsemployeeComponent;
  let fixture: ComponentFixture<EmployeedetailsemployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeedetailsemployeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeedetailsemployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
