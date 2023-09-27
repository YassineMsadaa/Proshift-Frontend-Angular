import { Component, OnInit } from '@angular/core';
import {Projet} from "../../../models/projet";
import {ProjetService} from "../../../services/projet.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-mesprojet',
  templateUrl: './mesprojet.component.html',
  styleUrls: ['./mesprojet.component.css']
})
export class MesprojetComponent implements OnInit {
  filteredProjects: Projet[] = [];
  etatFilter: string = "Tous";
  nameSearch: string = "";
  userId: number = 0;


  constructor(private projetService: ProjetService, private router: Router) { }

  ngOnInit(): void {
    this.userId = parseInt(localStorage.getItem('id')!.toString());
    this.loadProjects();
  }

  loadProjects(): void {
    this.projetService.findProjetsByEquipeEmployeesContains(this.userId).subscribe(
      (projects: Projet[]) => {
        this.filteredProjects = projects;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  openProjet(id: number): void {
    this.router.navigateByUrl(`/main/monprojet/${id}`);
  }


}
