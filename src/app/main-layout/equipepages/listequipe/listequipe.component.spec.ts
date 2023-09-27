import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListequipeComponent } from './listequipe.component';

describe('ListequipeComponent', () => {
  let component: ListequipeComponent;
  let fixture: ComponentFixture<ListequipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListequipeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListequipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
