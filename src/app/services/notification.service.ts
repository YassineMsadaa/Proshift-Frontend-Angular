import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private baseUrl = 'http://localhost:8084/notifications';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    return headers;
  }

  getAllNotifications(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.baseUrl, { headers });
  }

  getNotificationsByUserId(userId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseUrl}/${userId}`, { headers });
  }

  createNotification(notification: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(this.baseUrl, notification, { headers });
  }

  updateNotification(notification: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.baseUrl}/${notification.id}`, notification, { headers });
  }

  deleteNotification(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.baseUrl}/${id}`, { headers });
  }
}

