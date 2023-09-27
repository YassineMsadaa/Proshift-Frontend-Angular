import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesprojetparchefComponent } from './mesprojetparchef.component';

describe('MesprojetparchefComponent', () => {
  let component: MesprojetparchefComponent;
  let fixture: ComponentFixture<MesprojetparchefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesprojetparchefComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesprojetparchefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
