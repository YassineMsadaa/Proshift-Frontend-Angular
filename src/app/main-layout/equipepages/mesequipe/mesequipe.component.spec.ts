import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesequipeComponent } from './mesequipe.component';

describe('MesequipeComponent', () => {
  let component: MesequipeComponent;
  let fixture: ComponentFixture<MesequipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesequipeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesequipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
