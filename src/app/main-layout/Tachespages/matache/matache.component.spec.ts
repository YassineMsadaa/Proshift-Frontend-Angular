import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatacheComponent } from './matache.component';

describe('MatacheComponent', () => {
  let component: MatacheComponent;
  let fixture: ComponentFixture<MatacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatacheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
