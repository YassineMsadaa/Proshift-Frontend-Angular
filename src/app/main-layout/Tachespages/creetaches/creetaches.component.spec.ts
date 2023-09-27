import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreetachesComponent } from './creetaches.component';

describe('CreetachesComponent', () => {
  let component: CreetachesComponent;
  let fixture: ComponentFixture<CreetachesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreetachesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreetachesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
