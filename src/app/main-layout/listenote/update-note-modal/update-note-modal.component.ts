import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Note } from 'src/app/models/note';
import { EvenementService } from 'src/app/services/evenement.service';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-update-note-modal',
  templateUrl: './update-note-modal.component.html',
  styleUrls: ['./update-note-modal.component.css']
})
export class UpdateNoteModalComponent implements OnInit {
  @Input() note: Note | null = null;
  listemployee!: any[] ;
  selectedOption: string = "Selectionner un type" ;
  noteForm!:FormGroup;
  updatedNote: Note=new Note();

  constructor(private noteService:NoteService,private evenementService:EvenementService) { }

  ngOnInit(): void {
    this.getallemployee();
    console.log(this.note);
    this.noteForm = new FormGroup({
      id:new FormControl(this.note?.id),
      titre: new FormControl(this.note?.titre),
      description: new FormControl(this.note?.description),
      coordinateur:new FormControl(this.note?.coordinateur),
    });
  }
  getallemployee()
  {
    this.evenementService.getemployee().subscribe((res:any)=>{
      this.listemployee=res;
    })
  
  }
  updateNote(){
    console.log(this.noteForm);
       //console.log(this.noteForm.value.coordinateur);
       this.updatedNote.id = this.noteForm.value.id;
       this.updatedNote.titre = this.noteForm.value.titre;
       this.updatedNote.description = this.noteForm.value.description;
       this.updatedNote.coordinateur.id = this.noteForm.value.coordinateur;
       /*const n = {
         titre:this.noteForm.value.titre,
         description:this.noteForm.value.description,
         coordinateur:{
           id:this.noteForm.value.coordinateur
         }
       }*/
       //this.note.type = this.selectedOption;
       //this.demande.employee = this.employeeService.getEmployee(localStorage.getItem("id"));
       this.noteService.updateNote(this.updatedNote).subscribe(data => {
         console.log(data);
       });
  }
}
