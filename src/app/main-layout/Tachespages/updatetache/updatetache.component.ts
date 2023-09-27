import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../models/user";
import {Tache} from "../../../models/tache";
import {ActivatedRoute, Router} from "@angular/router";
import {TacheService} from "../../../services/tache.service";
import {UserService} from "../../../services/user.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-updatetache',
  templateUrl: './updatetache.component.html',
  styleUrls: ['./updatetache.component.css']
})
export class UpdatetacheComponent implements OnInit {

  tacheForm!: FormGroup;
  users: User[] = [];
  selectedUser: User | null = null;
  tache!: Tache;
  originalDateCreation: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tacheService: TacheService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.tacheForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      done: [false],
      dateFinEstimee: [null, Validators.required],
      employee: [null],
      priorite: [null, Validators.required],
      dateCreation: [''],
      dateFin:[''],
      dateAssignation:['']
    });

    this.route.paramMap.subscribe((params) => {
      const tacheIdParam = params.get('tacheId');
      const tacheId = tacheIdParam !== null ? +tacheIdParam : 0;
      if (tacheId !== 0) {
        this.tacheService.getTacheById(tacheId).subscribe((tache) => {
          this.tache = tache;
          this.originalDateCreation = tache.dateCreation;
          this.fillTacheForm();

          // Fetch users by equipe ID
          if (tache.projet && tache.projet.equipe && tache.projet.equipe.id) {
            this.userService.findUsersByEquipeId(tache.projet.equipe.id).subscribe((users) => {
              this.users = users;
            });
          }
        });
      }
    });
  }

  fillTacheForm(): void {

    this.tacheForm.patchValue({
      name: this.tache.name,
      description: this.tache.description,
      done: this.tache.done,
      dateFinEstimee: new Date(this.tache.dateFinEstimee).toISOString().slice(0, 16),
      employee: this.tache.employee ? this.tache.employee : null,
      priorite: this.tache.priorite,
      dateAssignation: this.tache.dateAssignation,
      dateFin: this.tache.dateFin,
      dateCreation: this.originalDateCreation,
    });
  }

  toggleTaskStatus(): void {
    const isTaskDone = this.tacheForm.value.done;

    Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir changer l\'état de la tâche ?',
      text: isTaskDone
        ? 'La tâche sera marquée comme en cours.'
        : 'La tâche sera marquée comme terminée.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tacheForm.patchValue({
          done: !isTaskDone,
        });

        const message = isTaskDone
          ? 'La tâche a été marquée comme en cours.'
          : 'La tâche a été marquée comme terminée.';

        Swal.fire({
          title: 'Succès',
          text: message,
          icon: 'success',
          confirmButtonText: 'OK',
        });
      }
    });
  }

  compareUsers(user1: User, user2: User): boolean {
    return user1 && user2 ? user1.id === user2.id : user1 === user2;
  }

  updateTache(): void {
    if (this.tacheForm.valid) {
      const updatedTache: Tache = {
        ...this.tacheForm.value,
        employee: this.tacheForm.value.employee,
        projet: this.tache.projet,
        id: this.tache.id,
      };

      this.tacheService.updateTache(updatedTache).subscribe(
        (response) => {
          Swal.fire({
            title: 'Mise à jour réussie',
            text: 'La tâche a été mise à jour avec succès.',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
            console.log('Task updated successfully:', updatedTache, response);
            // Handle success and navigation here
          });
        },
        (error) => {
          console.error('Error updating task:', error);
        }
      );
    }
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
        this.router.navigate(['/main/updateprojet/', this.tache.projet.id]);
      }
    });
  }


}
