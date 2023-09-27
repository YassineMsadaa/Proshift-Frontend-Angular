import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Projet} from "../../../models/projet";
import {User} from "../../../models/user";
import {Tache} from "../../../models/tache";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjetService} from "../../../services/projet.service";
import {UserService} from "../../../services/user.service";
import {TacheService} from "../../../services/tache.service";
import {formatDate} from "@angular/common";
import Swal from "sweetalert2";

@Component({
  selector: 'app-mestaches',
  templateUrl: './mestaches.component.html',
  styleUrls: ['./mestaches.component.css']
})
export class MestachesComponent implements OnInit {
  projetForm!: FormGroup;
  projetId!: number;
  projet!: Projet;
  users: User[] = [];
  taches: Tache[] = [];
  chef!: User;
  taskStatusFilter: 'tous' | 'finished' | 'notFinished' | 'enRetard' = 'tous';
  taskPriorityFilter: 'tous' | 'FAIBLE' | 'MOYENNE_FAIBLE' | 'MOYENNE' | 'MOYENNE_HAUTE' | 'ÉLEVÉE' = 'tous';
  searchText: string = '';
  showLateTasks: boolean = false;
  filteredTaches: Tache[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private projetService: ProjetService,
    private userService: UserService,
    private tacheService: TacheService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.projetForm = this.formBuilder.group({
      nom: ['', Validators.required],
      dateFinEstimee: [null, Validators.required],
      dateDebut: [null, Validators.required],
      description: [''],
      etat: ['', Validators.required],
      chef: [null, Validators.required],
    });

    this.route.paramMap.subscribe((params) => {
      const projetIdParam = params.get('id');
      this.projetId = projetIdParam !== null ? +projetIdParam : 0;
      if (this.projetId !== 0) {
        this.loadData();
      }
    });

    this.userService.getUsersByRole('ROLE_CHEF').subscribe((users) => {
      this.users = users;
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



  loadData(): void {
    this.projetService.getProjetById(this.projetId).subscribe((projet) => {
      this.projet = projet;
      this.fillProjetForm();

    });
    this.tacheService.findTachesByProjetId(this.projetId).subscribe((taches) => {
      this.taches = taches;
      this.applyFilters();
    });
  }

  fillProjetForm(): void {
    this.projetForm.patchValue({
      nom: this.projet.nom,
      dateFinEstimee: formatDate(this.projet.dateFinEstimee, 'yyyy-MM-dd', 'en'),
      dateDebut: formatDate(this.projet.dateDebut, 'yyyy-MM-dd', 'en'),
      description: this.projet.description,
      etat: this.projet.etat,
      chef: this.projet.chef ? this.projet.chef : null,
    });
  }


  editTache(tache: Tache): void {
    this.router.navigate(['/main/updatetache', tache.id]);
  }

  deleteTache(tache: Tache): void {
    Swal.fire({
      title: 'Êtes-vous sûr(e) ?',
      text: 'Cette action est irréversible !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        this.tacheService.deleteTache(tache.id).subscribe(
          (response) => {
            console.log('Tache deleted successfully:', response);
            Swal.fire('Supprimé', 'La tâche a été supprimée avec succès.', 'success');
            // Remove the deleted task from the taches array
            this.taches = this.taches.filter((item) => item.id !== tache.id);
          },
          (error) => {
            console.error('Error deleting tache:', error);
            Swal.fire('Erreur', 'Une erreur s\'est produite lors de la suppression de la tâche.', 'error');
          }
        );
      }
    });
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
