import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {

  constructor(private http:HttpClient) { }
  getAll(){
    return this.http.get(`${environment.baseurl}/event/findAll`)  
   }
   add(note: any)
   {
     return this.http.post(`${environment.baseurl}/event/add`,note)
   }
   delete(note: any)
   {
     return this.http.delete(`${environment.baseurl}/event/delete/`+note.id)
   }
   update(note: any)
   {
     return this.http.put(`${environment.baseurl}/event/update`,note);
   }
   getemployee(){
    return this.http.get(`${environment.baseurl}/event/getAllUsers`);
   }
   updateemployee(user:User){
    return this.http.put(`${environment.baseurl}/event/updateEmpl`,user);
   }
}
