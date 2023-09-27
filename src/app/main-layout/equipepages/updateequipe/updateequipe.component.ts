import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EquipeService } from "../../../services/equipe.service";
import { Equipe } from "../../../models/equipe";
import { Projet } from "../../../models/projet";
import { User } from "../../../models/user";
import {ActivatedRoute, Router} from "@angular/router";
import { ProjetService } from "../../../services/projet.service";
import { UserService } from "../../../services/user.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-updateequipe',
  templateUrl: './updateequipe.component.html',
  styleUrls: ['./updateequipe.component.css']
})
export class UpdateequipeComponent implements OnInit {
  equipeForm: FormGroup;
  equipeId: number = 0;
  equipe: Equipe = new Equipe();
  assignedProjects: Projet[] = [];
  unassignedProjects: Projet[] = [];
  assignedEmployees: User[] = [];
  unassignedEmployees: User[] = [];
  projectSearchQuery: string = '';
  unassignedProjectSearchQuery: string = '';
  memberSearchQuery: string = '';
  unassignedMemberSearchQuery: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private equipeService: EquipeService,
    private projectService: ProjetService,
    private userService: UserService,
    private router: Router
  ) {
    this.equipeForm = this.formBuilder.group({
      name: ['', Validators.required],
      dateCreation: [new Date()]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.equipeId = +params.get('equipeId')!;
      this.fetchEquipeDetails();
      this.fetchProjectsByEquipe(this.equipeId);
      this.fetchProjectsByEquipeIsNull();
      this.fetchEmployeesByEquipe(this.equipeId);
      this.fetchEmplouyeesByEquipeIsNull();
    });

    this.equipeForm = this.formBuilder.group({
      name: ['', Validators.required],
      dateCreation: [new Date()]
    });
  }

  fetchEquipeDetails(): void {
    this.equipeService.getEquipeById(this.equipeId).subscribe((equipe: Equipe) => {
      this.equipe = equipe;
      this.equipeForm.patchValue({
        name: this.equipe.name,
        dateCreation: this.equipe.dateCreation
      });
    });
  }
  fetchProjectsByEquipe(id: number) {
    this.projectService.findProjetsByEquipe_id(id).subscribe((projets: any[]) => {
      if (projets) {
        this.assignedProjects = projets;
      }
    });
  }
  fetchProjectsByEquipeIsNull() {
    this.projectService.findProjetsByEquipeIsNull().subscribe((projets: any[]) => {
      if (projets) {
        this.unassignedProjects = projets;
      }
    });
  }
  fetchEmployeesByEquipe(id: number) {
    this.userService.findUsersByEquipeId(id).subscribe((users: any[]) => {
      if (users) {
        this.assignedEmployees = users;
      }
    });
  }
  fetchEmplouyeesByEquipeIsNull() {
    this.userService.findUsersByRolesContainingAndEquipeIsNull("ROLE_EMPLOYEE").subscribe((users: any[]) => {
      if (users) {
        this.unassignedEmployees = users;
      }
    });
  }

  assignProject(project: any): void {
    this.assignedProjects.push(project);
    const index = this.unassignedProjects.findIndex((p: any) => p.id === project.id);
    if (index !== -1) {
      this.unassignedProjects.splice(index, 1);
    }
  }

  unassignProject(project: any): void {
    this.unassignedProjects.push(project);
    const index = this.assignedProjects.findIndex((p: any) => p.id === project.id);
    if (index !== -1) {
      this.assignedProjects.splice(index, 1);
    }
  }

  assignMember(employee: any): void {
    this.assignedEmployees.push(employee);
    const index = this.unassignedEmployees.findIndex((e: any) => e.id === employee.id);
    if (index !== -1) {
      this.unassignedEmployees.splice(index, 1);
    }
  }

  unassignMember(employee: any): void {
    this.unassignedEmployees.push(employee);
    const index = this.assignedEmployees.findIndex((e: any) => e.id === employee.id);
    if (index !== -1) {
      this.assignedEmployees.splice(index, 1);
    }
  }


  updateEquipe(): void {
    const equipeName = this.equipeForm.get('name')?.value;
    const equipeDateCreation = this.equipeForm.get('dateCreation')?.value;

    if (!equipeName || equipeName.trim() === '') {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Veuillez fournir un nom d\'équipe valide.',
        confirmButtonText: 'OK'
      });
      return;
    }

    this.userService.assignUsersToEquipe(this.equipeId, this.assignedEmployees).subscribe(() => {
    }, (error) => {
      console.error(error);
    });
    this.userService.unassignUsersFromEquipe(this.unassignedEmployees).subscribe(() => {
    }, (error) => {
      console.error(error);
    });
    this.projectService.assignProjetsToEquipe(this.assignedProjects, this.equipeId).subscribe(() => {
    }, (error) => {
      console.error(error);
    });
    this.projectService.unassignProjetsFromEquipe(this.unassignedProjects).subscribe(() => {
    }, (error) => {
      console.error(error);
    });

    this.equipe.name = equipeName;
    this.equipe.dateCreation = equipeDateCreation;
    this.equipe.projects = [];
    this.equipe.employees = [];
    this.equipeService.updateEquipe(this.equipeId, this.equipe).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Mise à jour réussie',
          text: 'L\'équipe a été mise à jour avec succès.',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/main/listequipe']);
        });
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  cancel(): void {
    Swal.fire({
      icon: 'warning',
      title: 'Annuler les modifications',
      text: 'Les modifications seront perdues. Voulez-vous vraiment annuler?',
      showCancelButton: true,
      cancelButtonText: 'Non',
      confirmButtonText: 'Oui'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/main/listequipe']);
      }
    });
  }

  filterAssignedProjects(): Projet[] {
    return this.assignedProjects.filter((project) =>
      project.nom.toLowerCase().includes(this.projectSearchQuery.toLowerCase())
    );
  }

  filterUnassignedProjects(): Projet[] {
    return this.unassignedProjects.filter((project) =>
      project.nom.toLowerCase().includes(this.unassignedProjectSearchQuery.toLowerCase())
    );
  }

  filterAssignedMembers(): User[] {
    return this.assignedEmployees.filter((employee) =>
      employee.username.toLowerCase().includes(this.memberSearchQuery.toLowerCase())
    );
  }

  filterUnassignedMembers(): User[] {
    return this.unassignedEmployees.filter((employee) =>
      employee.username.toLowerCase().includes(this.unassignedMemberSearchQuery.toLowerCase())
    );
  }


}
