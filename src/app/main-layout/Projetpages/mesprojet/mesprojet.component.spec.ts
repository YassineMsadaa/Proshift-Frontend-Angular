import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesprojetComponent } from './mesprojet.component';

describe('MesprojetComponent', () => {
  let component: MesprojetComponent;
  let fixture: ComponentFixture<MesprojetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesprojetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesprojetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
