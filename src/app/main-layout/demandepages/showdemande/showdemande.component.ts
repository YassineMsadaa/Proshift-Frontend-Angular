import { Component, OnInit } from '@angular/core';
import {Demande} from "../../../models/demande";
import {ActivatedRoute, Router} from "@angular/router";
import {DemandeService} from "../../../services/demande.service";

@Component({
  selector: 'app-showdemande',
  templateUrl: './showdemande.component.html',
  styleUrls: ['./showdemande.component.css']
})
export class ShowdemandeComponent implements OnInit {
  demande: any;

  constructor(
    private demandeService: DemandeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getDemande();
  }

  getDemande(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.demandeService.getDemandeById(id).subscribe(
      (data: any) => {
        this.demande = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  retour(): void {
    this.router.navigateByUrl('/main/listdemande');
  }

  accepter(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.demandeService.accepterDemande(id).subscribe(
      (data: any) => {
        console.log('Demande accepted');
        this.router.navigateByUrl('/main/listdemande');
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  refuser(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.demandeService.refuserDemande(id).subscribe(
      (data: any) => {
        // Handle the response if needed
        console.log('Demande refused');
        this.router.navigateByUrl('/main/listdemande');
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}

