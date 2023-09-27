import { Component, OnInit } from '@angular/core';
import {NoteService} from "../../services/note.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listeNote:any[]=[];
  constructor(private noteService:NoteService) { }

  ngOnInit(): void {
    this.getall();
  }
  getall(){
    this.noteService.getNote().subscribe((res:any)=>{

      this.listeNote=res

    })
  }
}
