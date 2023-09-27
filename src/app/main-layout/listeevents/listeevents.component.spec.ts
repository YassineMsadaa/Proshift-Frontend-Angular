import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeeventsComponent } from './listeevents.component';

describe('ListeeventsComponent', () => {
  let component: ListeeventsComponent;
  let fixture: ComponentFixture<ListeeventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeeventsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeeventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
