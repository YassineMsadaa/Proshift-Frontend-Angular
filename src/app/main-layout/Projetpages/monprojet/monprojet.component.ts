import { Component, OnInit } from '@angular/core';
import {Projet} from "../../../models/projet";
import {User} from "../../../models/user";
import {Tache} from "../../../models/tache";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjetService} from "../../../services/projet.service";
import {UserService} from "../../../services/user.service";
import {TacheService} from "../../../services/tache.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-monprojet',
  templateUrl: './monprojet.component.html',
  styleUrls: ['./monprojet.component.css']
})
export class MonprojetComponent implements OnInit {
  projetId!: number;
  projet!: Projet;
  taches: Tache[] = [];
  chef!: User;
  taskStatusFilter: 'tous' | 'finished' | 'notFinished' | 'enRetard' = 'tous';
  taskPriorityFilter: 'tous' | 'FAIBLE' | 'MOYENNE_FAIBLE' | 'MOYENNE' | 'MOYENNE_HAUTE' | 'ÉLEVÉE' = 'tous';
  searchText: string = '';
  filteredTaches: Tache[] = [];


  constructor(
    private route: ActivatedRoute,
    private projetService: ProjetService,
    private userService: UserService,
    private tacheService: TacheService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {
      const projetIdParam = params.get('id');
      this.projetId = projetIdParam !== null ? +projetIdParam : 0;
      if (this.projetId !== 0) {
        this.loadData();
      }
    });

    this.applyFilters();
  }

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

  loadData(): void {
    this.projetService.getProjetById(this.projetId).subscribe((projet) => {
      this.projet = projet;
      console.log(this.projet)

    });
    this.tacheService.findTachesByProjetId(this.projetId).subscribe((taches) => {
      this.taches = taches;
      this.applyFilters();
    });
  }

  openTache(tache: Tache): void {
    this.router.navigate(['/main/matache', tache.id]);
  }

  cancel(): void {
        this.router.navigate(['/main/mesprojet']);
  }
}
