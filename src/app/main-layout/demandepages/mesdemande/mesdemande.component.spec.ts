import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesdemandeComponent } from './mesdemande.component';

describe('MesdemandeComponent', () => {
  let component: MesdemandeComponent;
  let fixture: ComponentFixture<MesdemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesdemandeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesdemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
