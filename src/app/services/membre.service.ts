import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {catchError, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MembreService {
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.loadToken(); // Load the token initially
  }

  private loadToken(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.headers = this.headers.set('Authorization', `Bearer ${token}`);
      this.headers = this.headers.set('Content-Type', 'application/json');
    }
  }

  createMembre(membre: any): Observable<HttpResponse<any>> {
    return this.http.post<any>('http://localhost:8084/membre/create', membre, { headers: this.headers, observe: 'response' })
      .pipe(
        catchError(this.handleError)
      );
  }

  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data'); // Set the content type to 'multipart/form-data'

    return this.http.post('http://localhost:8084/membre/upload', formData, { headers: headers });
  }

  getAllMembreEntreprise(): Observable<any> {
    return this.http.get('http://localhost:8084/membre/getall', { headers: this.headers });
  }

  downloadFile(): Observable<Blob> {
    return this.http.get('http://localhost:8084/membre/download', { headers: this.headers, responseType: 'blob' });
  }

  deleteAllMembreEntreprise(): Observable<any> {
    return this.http.delete('http://localhost:8084/membre/delete', { headers: this.headers });
  }

  findMembreEntrepriseByRole(role: string): Observable<any> {
    return this.http.get(`http://localhost:8084/membre/getmembrebyrole/${role}`, { headers: this.headers });
  }

  findMembreEntrepriseByCin(cin: string): Observable<any> {
    return this.http.get(`http://localhost:8084/membre/getmembrebyrcin/${cin}`, { headers: this.headers });
  }

  updateMembreEntreprise(membre: any): Observable<any> {
    return this.http.put('http://localhost:8084/membre/updatemembre', membre, { headers: this.headers });
  }

  removeMembreEntreprise(cin: string): Observable<any> {
    return this.http.delete(`http://localhost:8084/membre/delete/${cin}`, { headers: this.headers });
  }

  private handleError(error: any): Observable<never> {
    // Handle the error here (e.g., log the error)
    console.error('An error occurred:', error);
    throw error;
  }
}
