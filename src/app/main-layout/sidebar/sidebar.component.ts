import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  userRole!:String;
  constructor() { }

  ngOnInit(): void {
    const userrole=localStorage.getItem("role")
    if(userrole) {
      this.userRole = userrole;
    }
  }

}
