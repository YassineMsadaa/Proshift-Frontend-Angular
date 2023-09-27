import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PlanningServiceService {

  constructor(private http:HttpClient) { }
  getplanning(){
    return this.http.get(`${environment.baseurl}/planning`)
  }
  add(planning: any) {
    return this.http.post(`${environment.baseurl}/planning`,planning)
  }
}
