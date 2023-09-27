import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EquipeService {
  private baseUrl = 'http://localhost:8084/equipes';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer <your-auth-token>'
    });
    return headers;
  }

  getAllEquipes(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseUrl}`, { headers });
  }

  getEquipeById(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseUrl}/${id}`, { headers });
  }

  createEquipe(equipe: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.baseUrl}`, equipe, { headers });
  }

  updateEquipe(id: number, equipe: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.baseUrl}/${id}`, equipe, { headers });
  }

  deleteEquipe(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.baseUrl}/${id}`, { headers });
  }
}
