import { Component, OnInit, ViewChild } from '@angular/core';
import { UpdateNoteModalComponent } from './update-note-modal/update-note-modal.component';
import { Note } from 'src/app/models/note';
import { FormControl, FormGroup } from '@angular/forms';
import { NoteService } from 'src/app/services/note.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-listenote',
  templateUrl: './listenote.component.html',
  styleUrls: ['./listenote.component.css']
})
export class ListenoteComponent implements OnInit {
  listeNote:any;
  @ViewChild('noteModal') noteModal!: any;
  @ViewChild('updateModal') updateModal!: any;
  note:any=null;
  noteForm!:FormGroup;

  constructor(private noteService:NoteService,private modalService: NgbModal) { }

 
  ngOnInit(): void {
    
    this.getall();
    this.noteForm = new FormGroup({
      titre: new FormControl(this.note?.titre),
      description: new FormControl(this.note?.description),
      coordinateur:new FormControl(this.note?.coordinateur),
    });

  }
  getall(){
    this.noteService.getNote().subscribe((res:any)=>{
      
      this.listeNote=res
      console.log("list of project", this.listeNote)
    })
  }

  deleteNote(note:any){
    this.noteService.deleteNote(note).subscribe(data=>console.log(data));
  }

  
  OpenUpdateModal(note: Note) {
    if (!note) {
      // Handle the case when note is undefined
      return;
    }
  
    this.note = note; // Set the note value
  
    // Open the modal
    const modalRef = this.modalService.open(UpdateNoteModalComponent);
    modalRef.componentInstance.note = this.note; // Pass the note value to the modal component

    modalRef.result
    .then((result) => {
      console.log(result); // You can access the result of the modal here
    })
    .catch((reason) => {
      console.log(reason); // Handle the case when the modal is dismissed or closed without a result
    });
    console.log(modalRef.componentInstance.note);

   
   // modalRef.componentInstance.note = note; // Pass the note value to the modal component
  
  }

}
