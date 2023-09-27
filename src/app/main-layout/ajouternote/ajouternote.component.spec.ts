import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouternoteComponent } from './ajouternote.component';

describe('AjouternoteComponent', () => {
  let component: AjouternoteComponent;
  let fixture: ComponentFixture<AjouternoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouternoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouternoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
