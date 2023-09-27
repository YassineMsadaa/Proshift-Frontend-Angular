import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Note } from 'src/app/models/note';
import { EvenementService } from 'src/app/services/evenement.service';
import { NoteService } from 'src/app/services/note.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajouternote',
  templateUrl: './ajouternote.component.html',
  styleUrls: ['./ajouternote.component.css']
})
export class AjouternoteComponent implements OnInit {
  note!: Note;
  noteForm!: FormGroup;
  selectedOption: string = "Selectionner un type" ;
  listemployee!: any[];
  

  constructor(private ns:NoteService,private evenementService:EvenementService) { }

  ngOnInit(): void {
    this.getallemployee();
   
    this.note = new Note();
    this.noteForm = new FormGroup({
      titre: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      coordinateur: new FormControl('', [Validators.required]),
      
    });

  }
 
  getallemployee()
  {
    this.evenementService.getemployee().subscribe((res:any)=>{
      this.listemployee=res;
    })
  
  }
  createNote() {
    this.note.titre = this.noteForm.value.titre;
    this.note.description = this.noteForm.value.description;
    this.note.coordinateur.id = this.noteForm.value.coordinateur;
       this.ns.addNote(this.note).subscribe(data => {
      console.log(data);
    });
    this.showSuccessAlert()
  }
  showSuccessAlert() {
    Swal.fire('Ajoute avec succès', '', 'success')
  }
  showErerrAlert() {
    Swal.fire('Incorrect...', 'You failed!', 'error')
  }
  
}
