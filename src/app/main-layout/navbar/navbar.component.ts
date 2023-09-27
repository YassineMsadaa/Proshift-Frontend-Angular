import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
declare var $: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  name!: any
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("username")
  }
  logout(){
    this.authService.signOut();
    $('#logoutModal').modal();

    this.router.navigateByUrl("auth/login")
  }
  openLogoutModal() {
    $('#logoutModal').modal('show');
  }

}
