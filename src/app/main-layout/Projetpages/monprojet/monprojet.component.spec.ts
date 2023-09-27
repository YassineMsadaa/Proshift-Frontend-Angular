import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonprojetComponent } from './monprojet.component';

describe('MonprojetComponent', () => {
  let component: MonprojetComponent;
  let fixture: ComponentFixture<MonprojetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonprojetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonprojetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
