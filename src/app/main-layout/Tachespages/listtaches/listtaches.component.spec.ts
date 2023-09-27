import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListtachesComponent } from './listtaches.component';

describe('ListtachesComponent', () => {
  let component: ListtachesComponent;
  let fixture: ComponentFixture<ListtachesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListtachesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListtachesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
