import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowdemandeComponent } from './showdemande.component';

describe('ShowdemandeComponent', () => {
  let component: ShowdemandeComponent;
  let fixture: ComponentFixture<ShowdemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowdemandeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowdemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
