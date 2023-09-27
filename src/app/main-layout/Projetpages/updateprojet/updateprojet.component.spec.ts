import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateprojetComponent } from './updateprojet.component';

describe('UpdateprojetComponent', () => {
  let component: UpdateprojetComponent;
  let fixture: ComponentFixture<UpdateprojetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateprojetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateprojetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
