import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedemandeComponent } from './updatedemande.component';

describe('UpdatedemandeComponent', () => {
  let component: UpdatedemandeComponent;
  let fixture: ComponentFixture<UpdatedemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatedemandeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatedemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
