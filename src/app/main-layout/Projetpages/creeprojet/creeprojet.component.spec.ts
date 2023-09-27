import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreeprojetComponent } from './creeprojet.component';

describe('CreeprojetComponent', () => {
  let component: CreeprojetComponent;
  let fixture: ComponentFixture<CreeprojetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreeprojetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreeprojetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
