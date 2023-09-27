import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateprojetparchefComponent } from './updateprojetparchef.component';

describe('UpdateprojetparchefComponent', () => {
  let component: UpdateprojetparchefComponent;
  let fixture: ComponentFixture<UpdateprojetparchefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateprojetparchefComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateprojetparchefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
