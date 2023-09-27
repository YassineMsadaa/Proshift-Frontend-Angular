import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListpresenceComponent } from './listpresence.component';

describe('ListpresenceComponent', () => {
  let component: ListpresenceComponent;
  let fixture: ComponentFixture<ListpresenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListpresenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListpresenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
