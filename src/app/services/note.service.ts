import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http:HttpClient) { }
  getNote(){
    return this.http.get(`${environment.baseurl}/note/findAllNote`)  
   }
   addNote(note: any)
   {
    console.log(note);
     return this.http.post(`${environment.baseurl}/note/add`,note)
   }
   deleteNote(note: any)
   {
    console.log(note.id);
     return this.http.delete(`${environment.baseurl}/note/delete/`+note.id)
   }
   updateNote(note: any)
   {
    console.log(note);
     return this.http.put(`${environment.baseurl}/note/update`,note)
   }
}
