import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonequipeComponent } from './monequipe.component';

describe('MonequipeComponent', () => {
  let component: MonequipeComponent;
  let fixture: ComponentFixture<MonequipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonequipeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonequipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
