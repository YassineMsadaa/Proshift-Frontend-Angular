import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../models/user";
import {Tache} from "../../../models/tache";
import {ActivatedRoute, Router} from "@angular/router";
import {TacheService} from "../../../services/tache.service";

@Component({
  selector: 'app-matache',
  templateUrl: './matache.component.html',
  styleUrls: ['./matache.component.css']
})
export class MatacheComponent implements OnInit {

  tacheForm!: FormGroup;
  users: User[] = [];
  tache!: Tache;
  userId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tacheService: TacheService
  ) {}

  ngOnInit(): void {
    const id = localStorage.getItem('id');
    if (id) {
      this.userId=parseInt(id);
    }
    this.tacheForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      done: [false],
      dateFinEstimee: [null, Validators.required],
      employee: [null, Validators.required],
      priorite: [null, Validators.required],
      projet: [null],
      dateCreation:[null],
      dateAssignation:[null],
      dateFin:[null],

    });

    this.route.paramMap.subscribe((params) => {
      const tacheIdParam = params.get('tacheId');
      const tacheId = tacheIdParam !== null ? +tacheIdParam : 0;
      if (tacheId !== 0) {
        this.tacheService.getTacheById(tacheId).subscribe((tache) => {
          this.tache = tache;
          this.fillTacheForm();
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
      projet: this.tache.projet,
      dateCreation: this.tache.dateCreation,
      dateAssignation:this.tache.dateAssignation,
      dateFin: this.tache.dateFin
    });
  }

  toggleTaskStatus(): void {
    this.tacheForm.patchValue({
      done: !this.tacheForm.value.done,
    });
    this.updateTache()
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
          console.log('Task updated successfully:', updatedTache, response);
          // Handle success and navigation here
        },
        (error) => {
          console.error('Error updating task:', error);
        }
      );
    }
  }
  cancel(): void {
    this.router.navigate(['/main/monprojet/',this.tache.projet.id]);
  }
}
