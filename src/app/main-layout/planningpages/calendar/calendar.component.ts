import { Component, ChangeDetectorRef } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import {TacheService} from "../../../services/tache.service";
import {Tache} from "../../../models/tache";
import {TaskEvent} from "../../../models/taskEvent";
import frLocale from '@fullcalendar/core/locales/fr';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Projet} from "../../../models/projet";
import {User} from "../../../models/user";
import {ProjetService} from "../../../services/projet.service";
import {UserService} from "../../../services/user.service";
import {formatDate} from "@angular/common";
import Swal from "sweetalert2";

@Component({
  selector: 'app-root',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent {
  taches: Tache[] = [];

  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    locale: frLocale,
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',

    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: false,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
  };
  currentEvents: EventApi[] = [];

  constructor(
    private changeDetector: ChangeDetectorRef,
    private tacheService: TacheService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchTasks();
    console.log(this.taches)
  }


  fetchTasks() {
    const id = localStorage.getItem('id');
    if (id) {
      this.tacheService.findTachesByEmployeeId(parseInt(id)).subscribe((taches: Tache[]) => {
        const tasks: TaskEvent[] = taches
          .filter(tache => tache.done !== true)
          .map(tache => ({
            id: tache.id.toString(),
            title: tache.name,
            start: tache.dateAssignation as Date,
            end: tache.dateFinEstimee as Date,
            allDay: !this.isAllDayEvent(tache.dateAssignation, tache.dateFinEstimee)
          }));
        this.calendarOptions.events = tasks;
        this.changeDetector.detectChanges();
      });
      this.tacheService.findTachesByEmployeeId(parseInt(id)).subscribe((taches) => {
        this.taches = taches.filter(tache => tache.done !== true);
        this.applyFilters();
      });
    }


  }

  isAllDayEvent(start: Date, end: Date): boolean {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return (
      startDate.getFullYear() === endDate.getFullYear() &&
      startDate.getMonth() === endDate.getMonth() &&
      startDate.getDate() === endDate.getDate()
    );
  }


  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleEventClick(clickInfo: EventClickArg) {
    const taskId = parseInt(clickInfo.event.id);
    this.router.navigate(['/matache', taskId]);
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }

  ///////////////////////////////////////////


  projet!: Projet;
  users: User[] = [];
  chef!: User;
  taskStatusFilter: 'tous' | 'finished' | 'notFinished' | 'enRetard' = 'tous';
  taskPriorityFilter: 'tous' | 'FAIBLE' | 'MOYENNE_FAIBLE' | 'MOYENNE' | 'MOYENNE_HAUTE' | 'ÉLEVÉE' = 'tous';
  searchText: string = '';
  filteredTaches: Tache[] = [];



  ////////////

   applyFilters(): void {
    this.filteredTaches = this.taches.filter((tache) => {
      // Filter by task status
      if (this.taskStatusFilter === 'finished') {
        if (!tache.done) return false;
      } else if (this.taskStatusFilter === 'notFinished') {
        if (tache.done) return false;
      } else if (this.taskStatusFilter === 'enRetard') {
        const currentDate = new Date();
        const dueDate = new Date(tache.dateFinEstimee);
        if (tache.done || currentDate <= dueDate) return false;
      }

      // Filter by task priority
      if (this.taskPriorityFilter !== 'tous' && tache.priorite !== this.taskPriorityFilter) {
        return false;
      }

      // Filter by search text (case-insensitive search by task name and user username)
      if (this.searchText.trim() !== '') {
        const searchTextLower = this.searchText.trim().toLowerCase();
        const taskNameLower = tache.name.toLowerCase();
        const userNameLower = tache.employee?.username.toLowerCase() || '';
        if (!taskNameLower.includes(searchTextLower) && !userNameLower.includes(searchTextLower)) {
          return false;
        }
      }

      return true;
    });
  }


  openTache(tache: Tache): void {
    this.router.navigate(['/main/matache', tache.id]);
  }

  cancel(): void {
    Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir annuler ?',
      text: 'Toutes les modifications seront perdues.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/main/listprojet']);
      }
    });
  }

}
