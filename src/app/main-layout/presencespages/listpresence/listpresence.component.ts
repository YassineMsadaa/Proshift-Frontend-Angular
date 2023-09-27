import { Component, OnInit } from '@angular/core';
import { Presence } from "../../../models/presence";
import { PresenceService } from "../../../services/presence.service";
import { User } from "../../../models/user";
import { UserService } from "../../../services/user.service";

@Component({
  selector: 'app-listpresence',
  templateUrl: './listpresence.component.html',
  styleUrls: ['./listpresence.component.css']
})
export class ListpresenceComponent implements OnInit {
  selectedDateSheet1!: string;
  selectedDateSheet2!: string;
  searchUsernameSheet1: string = '';
  searchUsernameSheet2: string = '';
  allPresences: Presence[] = [];
  filteredPresencesSheet1: { user: User, totalWorkedHours: number}[] = [];
  filteredPresencesSheet2: Presence[] = [];
  users: User[] = [];
  currentSheet: string = 'sheet1';

  constructor(private presenceService: PresenceService, private userService: UserService) {}

  ngOnInit() {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear().toString();
    this.selectedDateSheet1 = `${year}-${month}-${day}`;
    this.fetchUsers();
    this.fetchAllPresences();
  }

  fetchAllPresences() {
    this.presenceService.findAllPresence().subscribe(
      (response: Presence[]) => {
        this.allPresences = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  fetchUsers() {
    this.userService.getAllUsers().subscribe(
      (response: User[]) => {
        this.users = response;
        this.filterPresencesSheet1();
        this.filterPresencesSheet2();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  filterPresencesSheet1() {
    const filteredUsers = this.users.filter(user => {
      let isMatch = true;

      if (this.searchUsernameSheet1 && !user.username.includes(this.searchUsernameSheet1)) {
        isMatch = false;
      }

      return isMatch;
    });

    this.filteredPresencesSheet1 = filteredUsers.map(user => {
      const filteredPresences = this.allPresences.filter(presence => {
        return (
          presence.user.id === user.id &&
          this.isSameDay(new Date(presence.dateCreation), new Date(this.selectedDateSheet1))
        );
      });

      const totalWorkedHours = filteredPresences.reduce((total, presence) => {
        return total + presence.hoursWorked;
      }, 0);

      return { user, totalWorkedHours };
    });
  }

  filterPresencesSheet2() {
    const filteredPresences = this.allPresences.filter(presence => {
      const isMatch =
        (!this.selectedDateSheet2 || this.isSameDay(new Date(presence.dateCreation), new Date(this.selectedDateSheet2))) &&
        (!this.searchUsernameSheet2 || presence.user.username.includes(this.searchUsernameSheet2));

      return isMatch;
    });

    this.filteredPresencesSheet2 = filteredPresences;
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }


  getPresenceEtat(hoursWorked: number | null): string {
    if(hoursWorked !== null){
    if (hoursWorked === 0) {
      return 'Absent';
    } else if (hoursWorked < 6) {
      return 'Partiellement present';
    } else {
      return 'Présent';
    }}
    return 'N/A';
  }

  selectSheet(sheet: string) {
    this.currentSheet = sheet;
  }

  onDateChangeSheet1(event: any) {
    if (event && event.target) {
      this.selectedDateSheet1 = event.target.value;
      this.filterPresencesSheet1();
    }
  }

  onDateChangeSheet2(event: any) {
    if (event && event.target) {
      this.selectedDateSheet2 = event.target.value;
      this.filterPresencesSheet2();
    }
  }

  getDay(date: string): string {
    return date.split('-')[2];
  }

  getMonth(date: string): string {
    return date.split('-')[1];
  }

  getYear(date: string): string {
    return date.split('-')[0];
  }

  getCurrentDate(): string {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear().toString();

    return `${year}-${month}-${day}`;
  }
}
