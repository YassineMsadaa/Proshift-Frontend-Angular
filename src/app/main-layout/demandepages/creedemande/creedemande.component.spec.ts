import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreedemandeComponent } from './creedemande.component';

describe('CreedemandeComponent', () => {
  let component: CreedemandeComponent;
  let fixture: ComponentFixture<CreedemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreedemandeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreedemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
