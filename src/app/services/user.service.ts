import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Role} from "../models/role";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.loadToken();
  }

  private loadToken(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.headers = this.headers.set('Authorization', `Bearer ${token}`);
      this.headers = this.headers.set('Content-Type', 'application/json');
    }
  }

  getAllUsers(): Observable<any> {
    return this.http.get('http://localhost:8084/user/getAll', { headers: this.headers });
  }

  getUserById(userId: number): Observable<any> {
    return this.http.get(`http://localhost:8084/user/getuser/${userId}`, { headers: this.headers });
  }

  getUsersByRole(role: any): Observable<any> {
    const options = {
      headers: this.headers,

    };
    return this.http.get('http://localhost:8084/user/getbyrole/'+role, options);
  }
  findUsersByEquipeId(id: number): Observable<any> {
    return this.http.get(`http://localhost:8084/user/byEquipeId/${id}`, { headers: this.headers });
  }

  findUsersByRolesContainingAndEquipeIsNull(role: string): Observable<any> {
    return this.http.get(`http://localhost:8084/user/byRolesAndEquipeIsNull/${role}`, { headers: this.headers });
  }

  assignUsersToEquipe(equipeId: number, users: User[]): Observable<any> {
    return this.http.put(`http://localhost:8084/user/assignUsersToEquipe/${equipeId}`, users, { headers: this.headers });
  }

  unassignUsersFromEquipe(users: User[]): Observable<any> {
    return this.http.put(`http://localhost:8084/user/unassignUsersFromEquipe`, users, { headers: this.headers });
  }

  getUsersByDepartment(department: string): Observable<any> {
    const options = {
      headers: this.headers,
      body: { departement: department }
    };
    return this.http.get('http://localhost:8084/user/getbydepartement', options);
  }
  updateUser(user: any): Observable<any> {
    return this.http.put('http://localhost:8084/user/updateUser', user, { headers: this.headers });
  }

  banClient(userId: number): Observable<any> {
    return this.http.put(`http://localhost:8084/user/banclient/${userId}`, null, { headers: this.headers });
  }

  unbanClient(userId: number): Observable<any> {
    return this.http.put(`http://localhost:8084/user/unbanclient/${userId}`, null, { headers: this.headers });
  }

  checkIn(userId: number): Observable<any> {
    return this.http.put(`http://localhost:8084/user/check/${userId}`, null, { headers: this.headers });
  }

  changePassword(changePasswordRequest: any): Observable<any> {
    return this.http.post('http://localhost:8084/user/changePassword', changePasswordRequest, { headers: this.headers });
  }

  deleteUser(idUser: number): Observable<any> {
    return this.http.delete(`http://localhost:8084/user/delete/${idUser}`, { headers: this.headers });
  }
}
