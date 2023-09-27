import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterEventModalComponent } from './consulter-event-modal.component';

describe('ConsulterEventModalComponent', () => {
  let component: ConsulterEventModalComponent;
  let fixture: ComponentFixture<ConsulterEventModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsulterEventModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsulterEventModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
