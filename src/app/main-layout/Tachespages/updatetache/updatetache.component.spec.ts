import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatetacheComponent } from './updatetache.component';

describe('UpdatetacheComponent', () => {
  let component: UpdatetacheComponent;
  let fixture: ComponentFixture<UpdatetacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatetacheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatetacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
