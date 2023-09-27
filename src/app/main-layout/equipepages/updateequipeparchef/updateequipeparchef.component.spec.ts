import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateequipeparchefComponent } from './updateequipeparchef.component';

describe('UpdateequipeparchefComponent', () => {
  let component: UpdateequipeparchefComponent;
  let fixture: ComponentFixture<UpdateequipeparchefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateequipeparchefComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateequipeparchefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
