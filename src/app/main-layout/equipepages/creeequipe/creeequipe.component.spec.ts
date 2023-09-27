import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreeequipeComponent } from './creeequipe.component';

describe('CreeequipeComponent', () => {
  let component: CreeequipeComponent;
  let fixture: ComponentFixture<CreeequipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreeequipeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreeequipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
