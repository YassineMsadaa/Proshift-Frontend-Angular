import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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

  signOut(): Observable<any> {
    this.headers = this.headers.delete('Authorization');
    localStorage.clear();
    return this.http.post(`http://localhost:8084/auth/signout`, {}, { headers: this.headers });
  }

  signin(SigninRequest:any){
    return this.http.post(`http://localhost:8084/auth/signin`,SigninRequest,{headers : this.headers})
  }

  signup(SignupRequest:any){
    return this.http.post(`http://localhost:8084/auth/signup`,SignupRequest)
  }
  forgotPassword(email: string): Observable<any> {
    return this.http.post(`http://localhost:8084/auth/forgotpassword/${email}`, {});
  }
  resetPassword(newpassword: string,code:string):Observable<any>{
    return this.http.post<any>("http://localhost:8084/auth/resetPassword?code="+ code, {newPassword: newpassword});
  }
  verifyAccount(code:string):Observable<any>{
    return this.http.get<any>("http://localhost:8084/auth/verify?code="+ code);
  }


}
