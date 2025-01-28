import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioncongeComponent } from './gestionconge.component';

describe('GestioncongeComponent', () => {
  let component: GestioncongeComponent;
  let fixture: ComponentFixture<GestioncongeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestioncongeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestioncongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
