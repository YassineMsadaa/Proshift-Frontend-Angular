import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../models/user';
import {ActivatedRoute, Router} from '@angular/router';
import { ProjetService } from '../../../services/projet.service';
import { UserService } from '../../../services/user.service';
import { TacheService } from '../../../services/tache.service';
import { Projet } from '../../../models/projet';
import { Tache } from '../../../models/tache';
import Swal from "sweetalert2";
import {Priorite} from "../../../models/enums/priorite";

@Component({
  selector: 'app-creetaches',
  templateUrl: './creetaches.component.html',
  styleUrls: ['./creetaches.component.css'],
})
export class CreetachesComponent implements OnInit {
  taskForm!: FormGroup;
  projectId!: number;
  users: User[] = [];
  selectedUser: User | null = null;
  projet!: Projet;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private projetService: ProjetService,
    private userService: UserService,
    private tacheService: TacheService
  ) {}

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      done: [false],
      dateFinEstimee: [null, Validators.required],
      selectedUser: [null],
      priorite: [null, Validators.required],
    });

    this.route.paramMap.subscribe((params) => {
      const projectIdParam = params.get('projectId');
      this.projectId = projectIdParam !== null ? +projectIdParam : 0;
      if (this.projectId !== 0) {
        this.projetService.getProjetById(this.projectId).subscribe((project) => {
          this.projet = project;
          if (project && project.equipe && project.equipe.id) {
            this.userService.findUsersByEquipeId(project.equipe.id).subscribe((users) => {
              if (users && users.length > 0) {
                this.users = users;
              } else {
                console.error('No users found for the equipe.');
              }
            });
          } else {
            console.error('Project or project.equipe is null or equipe.id is not available.');
          }
        });
      }
    });
  }

  onUserSelected(event: any): void {
    this.selectedUser = event;
  }

  createTask(): void {
    if (this.taskForm.valid && this.projet) {
      const newTask: Tache = {
        ...this.taskForm.value,
        employee: this.selectedUser,
        projet: this.projet,
        priorite: this.taskForm.value.priorite as Priorite,
        id: 0,
      };

      this.tacheService.createTache(newTask).subscribe(
        (response) => {
          console.log('Task created successfully:', newTask, response);
          this.taskForm.reset();
          this.selectedUser = null;
          Swal.fire({
            icon: 'success',
            title: 'Ajout réussi',
            text: 'La tâche a été ajoutée avec succès.',
            showCancelButton: true,
            confirmButtonText: 'Retourner au projet',
            cancelButtonText: 'Ajouter une autre tâche',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/main/updateprojet/', this.projectId]);
            } else {
            }
          });
        },
        (error) => {
          Swal.fire('Erreur', 'Une erreur s\'est produite lors de l\'ajout de la tâche.', 'error');
        }
      );
    } else {
      Swal.fire('Champs requis manquants', 'Veuillez remplir tous les champs requis.', 'warning');
    }
  }

  cancel(): void {
    this.router.navigate(['/main/updateprojet/', this.projectId]);
  }
}
