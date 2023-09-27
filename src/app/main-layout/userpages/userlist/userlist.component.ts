import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";
import {Role} from "../../../models/role";
import {Router} from "@angular/router";

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  listUtilisateur: User[] = [];
  filteredUsers: User[] = [];
  roleFilter: Role | 'Tous' = 'Tous';
  approvalFilter: string = 'Tous';
  nameSearch: string = '';

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(
      (response: any) => {
        this.listUtilisateur = response;
        this.applyFilters(); // Apply initial filters when users are loaded
      },
      (error: any) => {
        console.error('Error while loading users:', error);
      }
    );
  }
  searchByName() {
    const searchQuery = this.nameSearch.toLowerCase().trim();

    // Perform case-insensitive search based on username
    const searchResults = this.listUtilisateur.filter(user =>
      (user.username?.toLowerCase().includes(searchQuery) || '') || (user.cin?.toLowerCase().includes(searchQuery) || '')
    );

    // Update the filteredUsers array with the search results
    this.filteredUsers = searchResults;
  }

  applyFilters() {
    let filteredUsers: User[] = this.listUtilisateur;

    // Apply role filter
    if (this.roleFilter !== 'Tous') {
      filteredUsers = filteredUsers.filter(user => user.roles.some(role => role.name === this.roleFilter));
    }

    // Apply approval filter
    if (this.approvalFilter !== 'Tous') {
      const approved = this.approvalFilter === 'true';
      filteredUsers = filteredUsers.filter(user => user.approved === approved);
    }

    // Update the filteredUsers array with the filtered results
    this.filteredUsers = filteredUsers;
  }


  OpenUpdateUser(userid: any) {
    this.router.navigate(['/main/modifieruser/', userid]);
  }

  deleteUser(user: User) {
    // Implement the logic for deleting a user
  }

}
