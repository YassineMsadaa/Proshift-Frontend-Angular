import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  private apiUrl = 'http://localhost:8084/demandes'; // Change the API URL accordingly
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token') // Add your authentication token retrieval logic here
    })
  };

  constructor(private http: HttpClient) { }

  createDemande(demande: any,id: any): Observable<any> {
    return this.http.post<any>(this.apiUrl+"/"+id, demande, this.httpOptions);
  }

  getAllDemandes(): Observable<any> {
    return this.http.get<any>(this.apiUrl, this.httpOptions);
  }

  getDemandeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, this.httpOptions);
  }

  updateDemande(id: number, demande: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, demande, this.httpOptions);
  }

  deleteDemande(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, this.httpOptions);
  }

  accepterDemande(id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}/accepter`, null, this.httpOptions);
  }

  refuserDemande(id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}/refuser`, null, this.httpOptions);
  }
  getDemandesByUserId(userId: number): Observable<any> {
    const url = `${this.apiUrl}/user/${userId}`;
    return this.http.get<any>(url,  this.httpOptions );
  }
}
