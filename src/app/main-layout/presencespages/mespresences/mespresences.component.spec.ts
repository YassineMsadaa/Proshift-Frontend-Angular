import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MespresencesComponent } from './mespresences.component';

describe('MespresencesComponent', () => {
  let component: MespresencesComponent;
  let fixture: ComponentFixture<MespresencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MespresencesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MespresencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
