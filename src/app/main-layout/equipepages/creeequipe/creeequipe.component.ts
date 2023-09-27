import { Component, OnInit } from '@angular/core';
import { Projet } from "../../../models/projet";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../../services/user.service";
import { User } from "../../../models/user";
import { ProjetService } from "../../../services/projet.service";
import { EquipeService } from "../../../services/equipe.service";
import Swal from 'sweetalert2';
import {Router} from "@angular/router";

@Component({
  selector: 'app-creeequipe',
  templateUrl: './creeequipe.component.html',
  styleUrls: ['./creeequipe.component.css']
})
export class CreeequipeComponent implements OnInit {
  equipeForm!: FormGroup;
  users: User[] = [];
  projects: Projet[] = [];
  chefDeProjetId: number = 0;
  chef!: User;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private equipeService: EquipeService,
    private projectService: ProjetService
  ) {}

  ngOnInit() {
    this.initEquipeForm();
    this.getChefDeProjetIdFromLocalStorage();
    this.getChef();
    this.getUsersByRole('ROLE_EMPLOYEE');
    this.getProjects();

  }

  initEquipeForm() {
    this.equipeForm = this.formBuilder.group({
      name: ['', Validators.required],
      selectedUsers: [],
      selectedProjects: []
    });
  }

  getUsersByRole(role: string) {
    this.userService.findUsersByRolesContainingAndEquipeIsNull(role).subscribe(
      (response: User[]) => {
        this.users = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getProjects() {
    this.projectService.findProjetsByEquipeIsNull().subscribe(
      (response: Projet[]) => {
        this.projects = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  getChef() {
    this.userService.getUserById(this.chefDeProjetId).subscribe(
      (response: User) => {
        this.chef = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getChefDeProjetIdFromLocalStorage() {
    const chefDeProjetId = localStorage.getItem('id');
    if (chefDeProjetId) {
      this.chefDeProjetId = parseInt(chefDeProjetId, 10);
    }
  }

  getSelectedProject(): Projet[] {
    const selectedProjectId = +this.equipeForm.get('selectedProjects')?.value;
    return this.projects.filter(project => project.id === selectedProjectId);
  }

  createEquipe() {
    if (this.equipeForm.valid) {
      const selectedProjects = this.getSelectedProject();
      const selectedUserIds = this.equipeForm.get('selectedUsers')?.value;
      const selectedUsers = this.users.filter(user => selectedUserIds.includes(user.id));

      const equipe = {
        name: this.equipeForm.get('name')?.value,
        projectMaster: this.chef,
        employees: selectedUsers,
        projects: selectedProjects
      };
      console.log(equipe.projectMaster)
      console.log(equipe.employees)
      console.log(equipe.projects)

      this.equipeService.createEquipe(equipe).subscribe(
        (response: any) => {
          // Handle success
          Swal.fire({
            icon: 'success',
            title: 'Équipe créée',
            text: 'L\'équipe a été créée avec succès.',
            confirmButtonText: 'OK'
          }).then(() => {
            // Redirect to the list page after Swal dialog is closed
            this.router.navigate(['/main/listequipe']);
          });
        },
        (error: any) => {
          console.log(error);
        }
      );
    } else {
      // Form validation failed
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Veuillez fournir un nom d\'équipe valide.',
        confirmButtonText: 'OK'
      });
    }
  }
}
