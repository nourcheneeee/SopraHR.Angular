import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongedetailsComponent } from './congedetails.component';

describe('CongedetailsComponent', () => {
  let component: CongedetailsComponent;
  let fixture: ComponentFixture<CongedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CongedetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CongedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
