import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutereventComponent } from './ajouterevent.component';

describe('AjoutereventComponent', () => {
  let component: AjoutereventComponent;
  let fixture: ComponentFixture<AjoutereventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutereventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutereventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
