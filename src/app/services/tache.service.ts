import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tache} from "../models/tache";

@Injectable({
  providedIn: 'root'
})
export class TacheService {
  private baseUrl = 'http://localhost:8084/taches';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    return headers;
  }

  getAllTaches(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.baseUrl, { headers });
  }

  getTacheById(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseUrl}/${id}`, { headers });
  }

  createTache(tache: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(this.baseUrl, tache, { headers });
  }

  updateTache(tache: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.baseUrl}/update`, tache, { headers });
  }

  deleteTache(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.baseUrl}/${id}`, { headers });
  }
  findTachesByProjetId(projetId: number): Observable<Tache[]> {
    const headers = this.getHeaders();
    return this.http.get<Tache[]>(`${this.baseUrl}/findTachesByProjet_Id/${projetId}`, { headers });
  }
  findTachesByEmployeeId(userId: number): Observable<Tache[]> {
    const headers = this.getHeaders();
    return this.http.get<Tache[]>(`${this.baseUrl}/findTachesByEmployee_id/${userId}`, { headers });
  }
}
