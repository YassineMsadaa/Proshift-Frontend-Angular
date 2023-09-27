import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNoteModalComponent } from './update-note-modal.component';

describe('UpdateNoteModalComponent', () => {
  let component: UpdateNoteModalComponent;
  let fixture: ComponentFixture<UpdateNoteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateNoteModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateNoteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
