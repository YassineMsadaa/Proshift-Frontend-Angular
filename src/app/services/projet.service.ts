import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Projet } from "../models/projet";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  private baseUrl = 'http://localhost:8084/projets';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    return headers;
  }

  getAllProjets(): Observable<Projet[]> {
    const headers = this.getHeaders();
    return this.http.get<Projet[]>(this.baseUrl, { headers });
  }

  findProjetsByEquipeIsNull(): Observable<Projet[]> {
    const headers = this.getHeaders();
    return this.http.get<Projet[]>(`${this.baseUrl}/byEquipeIsNull`, { headers });
  }

  findProjetsByEquipe_id(id: number): Observable<Projet[]> {
    const headers = this.getHeaders();
    return this.http.get<Projet[]>(`${this.baseUrl}/byEquipe/${id}`, { headers });
  }
  findProjetsByEquipe_idOrEquipeIsNull(id: number): Observable<Projet[]> {
    const headers = this.getHeaders();
    return this.http.get<Projet[]>(`${this.baseUrl}/byEquipe_idOrNull/${id}`, { headers });
  }

  getProjetById(id: number): Observable<Projet> {
    const headers = this.getHeaders();
    return this.http.get<Projet>(`${this.baseUrl}/${id}`, { headers });
  }

  createProjet(projet: Projet): Observable<Projet> {
    const headers = this.getHeaders();
    return this.http.post<Projet>(this.baseUrl, projet, { headers });
  }

  updateProjet(id: number, projet: Projet): Observable<Projet> {
    const headers = this.getHeaders();
    return this.http.put<Projet>(`${this.baseUrl}/${id}`, projet, { headers });
  }

  deleteProjet(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.baseUrl}/${id}`, { headers });
  }

  assignProjetsToEquipe( projets: Projet[],equipeId:number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.baseUrl}/assignProjetsToEquipe/${equipeId}`, projets, { headers });
  }

  unassignProjetsFromEquipe(projets: Projet[]): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.baseUrl}/unassignProjetsFromEquipe`, projets, { headers });
  }
  findProjetsByEquipeEmployeesContains(userid: number): Observable<Projet[]> {
    const headers = this.getHeaders();
    return this.http.get<Projet[]>(`${this.baseUrl}/findProjetsByEquipe_EmployeesContains/${userid}`, { headers });
  }

  findProjetsByChef(userid: number): Observable<Projet[]> {
    const headers = this.getHeaders();
    return this.http.get<Projet[]>(`${this.baseUrl}/findProjetsByChef/${userid}`, { headers });
  }
}
