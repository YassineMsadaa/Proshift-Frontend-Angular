import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListenoteComponent } from './listenote.component';

describe('ListenoteComponent', () => {
  let component: ListenoteComponent;
  let fixture: ComponentFixture<ListenoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListenoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListenoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
