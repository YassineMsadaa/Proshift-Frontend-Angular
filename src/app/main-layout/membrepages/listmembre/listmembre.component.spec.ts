import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListmembreComponent } from './listmembre.component';

describe('ListmembreComponent', () => {
  let component: ListmembreComponent;
  let fixture: ComponentFixture<ListmembreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListmembreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListmembreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
