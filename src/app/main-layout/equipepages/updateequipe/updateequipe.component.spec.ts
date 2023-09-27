import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateequipeComponent } from './updateequipe.component';

describe('UpdateequipeComponent', () => {
  let component: UpdateequipeComponent;
  let fixture: ComponentFixture<UpdateequipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateequipeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateequipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
