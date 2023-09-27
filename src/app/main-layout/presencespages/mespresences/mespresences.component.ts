import { Component, OnInit } from '@angular/core';
import {Presence} from "../../../models/presence";
import {User} from "../../../models/user";
import {PresenceService} from "../../../services/presence.service";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-mespresences',
  templateUrl: './mespresences.component.html',
  styleUrls: ['./mespresences.component.css']
})
export class MespresencesComponent implements OnInit {
  selectedDateSheet1!: string;
  selectedDateSheet2!: string;
  allPresences: Presence[] = [];
  filteredPresencesSheet1: { date: string, totalWorkedHours: number }[] = [];
  filteredPresencesSheet2: Presence[] = [];
  currentSheet: string = 'sheet1';
  user!: User;

  constructor(private presenceService: PresenceService, private userService: UserService) {}

  ngOnInit() {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear().toString();
    this.selectedDateSheet1 = `${year}-${month}-${day}`;
    this.fetchUser();
    this.fetchAllPresences();
  }

  fetchAllPresences() {
    this.presenceService.findAllPresence().subscribe(
      (response: Presence[]) => {
        this.allPresences = response;
        this.filterPresencesSheet1(); // Apply filtering for Sheet 1
        this.filterPresencesSheet2(); // Apply filtering for Sheet 2
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  filterPresencesSheet1() {
    const filteredPresences = this.allPresences.filter(presence => {
      const isMatch =
        (!this.selectedDateSheet1 || this.isSameDay(new Date(presence.dateCreation), new Date(this.selectedDateSheet1)));

      return isMatch;
    });

    const groupedPresences = this.groupPresencesByDate(filteredPresences);

    this.filteredPresencesSheet1 = Array.from(groupedPresences.entries()).map(([date, presences]) => {
      const totalWorkedHours = presences.reduce((total, presence) => {
        return total + presence.hoursWorked;
      }, 0);

      return { date, totalWorkedHours };
    });
  }

  filterPresencesSheet2() {
    let filteredPresences = this.allPresences;

    if (this.selectedDateSheet2) {
      filteredPresences = filteredPresences.filter(presence => this.isSameDay(new Date(presence.dateCreation), new Date(this.selectedDateSheet2)));
    }

    this.filteredPresencesSheet2 = filteredPresences;
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  fetchUser() {
    const userId=localStorage.getItem("userId");
    if(userId)
    this.userService.getUserById(parseInt(userId.toString())).subscribe(
      (response: User) => {
        this.user = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getPresenceEtat(hoursWorked: number | null): string {
    if (hoursWorked === null) {
      return 'N/A';
    } else if (hoursWorked < 6) {
      return 'Parciellement présent';
    } else {
      return 'Présent';
    }
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

  groupPresencesByDate(presences: Presence[]): Map<string, Presence[]> {
    const groupedPresences = new Map<string, Presence[]>();

    for (const presence of presences) {
      const dateKey = this.getDateKey(presence.dateCreation.toString());
      if (groupedPresences.has(dateKey)) {
        groupedPresences.get(dateKey)?.push(presence);
      } else {
        groupedPresences.set(dateKey, [presence]);
      }
    }

    return groupedPresences;
  }

  getDateKey(date: string): string {
    return date.split('T')[0];
  }

  getCurrentDate(): string {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear().toString();

    return `${year}-${month}-${day}`;
  }
}
