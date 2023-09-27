import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  private baseUrl = 'http://localhost:8084/presence';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer <your-auth-token>'
    });
    return headers;
  }

  findAllPresence(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseUrl}/findAllPresence`, { headers });
  }

  createPresence( userId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.baseUrl}/createPresence/${userId}`, { headers });
  }

  findPresenceByUserId(userId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseUrl}/findPresenceByUserId/${userId}`, { headers });
  }

  findPresenceByDateCreation(date: Date): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.baseUrl}/findPresenceByDateCreation`, { headers, body: { date } });
  }

  findPresenceById(idPresence: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseUrl}/findPresenceById/${idPresence}`, { headers });
  }

  calculeWorkedHours(date1: Date, date2: Date, id:number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.baseUrl}/calculeWorkedHours/${id}`, { headers, body: { date1, date2 } });
  }

  removePresence(idPresence: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.baseUrl}/delete/${idPresence}`, { headers });
  }
}
