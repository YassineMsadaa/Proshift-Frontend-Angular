import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import {LoginComponent} from "./auth-layout/login/login.component";
import {RegisterComponent} from "./auth-layout/register/register.component";
import {HomeComponent} from "./main-layout/home/home.component";
import {AuthGuard} from "./auth.guard";
import {ForgotpasswordComponent} from "./auth-layout/forgotpassword/forgotpassword.component";
import {NewpasswordComponent} from "./auth-layout/newpassword/newpassword.component";
import {MesdemandeComponent} from "./main-layout/demandepages/mesdemande/mesdemande.component";
import {UserlistComponent} from "./main-layout/userpages/userlist/userlist.component";
import { ListenoteComponent } from './main-layout/listenote/listenote.component';
import { ListeeventsComponent } from './main-layout/listeevents/listeevents.component';
import { ListeemployeComponent } from './main-layout/listeemploye/listeemploye.component';
import { AjouternoteComponent } from './main-layout/ajouternote/ajouternote.component';
import { AjoutereventComponent } from './main-layout/ajouterevent/ajouterevent.component';
import {UpdatedemandeComponent} from "./main-layout/demandepages/updatedemande/updatedemande.component";
import {ShowdemandeComponent} from "./main-layout/demandepages/showdemande/showdemande.component";
import {CreedemandeComponent} from "./main-layout/demandepages/creedemande/creedemande.component";
import {ListdemandeComponent} from "./main-layout/demandepages/listdemande/listdemande.component";
import {ListeprojetComponent} from "./main-layout/Projetpages/listeprojet/listeprojet.component";
import {CreeprojetComponent} from "./main-layout/Projetpages/creeprojet/creeprojet.component";
import {ListmembreComponent} from "./main-layout/membrepages/listmembre/listmembre.component";
import {CreateMembreComponent} from "./main-layout/membrepages/create-membre/create-membre.component";
import {ModifieruserComponent} from "./main-layout/userpages/modifieruser/modifieruser.component";
import {VerifComponent} from "./auth-layout/verif/verif.component";
import {MonprofileComponent} from "./main-layout/userpages/monprofile/monprofile.component";
import {ListpresenceComponent} from "./main-layout/presencespages/listpresence/listpresence.component";
import {MespresencesComponent} from "./main-layout/presencespages/mespresences/mespresences.component";
import {CreeequipeComponent} from "./main-layout/equipepages/creeequipe/creeequipe.component";
import {ListequipeComponent} from "./main-layout/equipepages/listequipe/listequipe.component";
import {UpdateequipeComponent} from "./main-layout/equipepages/updateequipe/updateequipe.component";
import {CreetachesComponent} from "./main-layout/Tachespages/creetaches/creetaches.component";
import {ListtachesComponent} from "./main-layout/Tachespages/listtaches/listtaches.component";
import {MestachesComponent} from "./main-layout/Tachespages/mestaches/mestaches.component";
import {UpdatetacheComponent} from "./main-layout/Tachespages/updatetache/updatetache.component";
import {UpdateprojetComponent} from "./main-layout/Projetpages/updateprojet/updateprojet.component";
import {MesprojetComponent} from "./main-layout/Projetpages/mesprojet/mesprojet.component";
import {MesprojetparchefComponent} from "./main-layout/Projetpages/mesprojetparchef/mesprojetparchef.component";
import {MonprojetComponent} from "./main-layout/Projetpages/monprojet/monprojet.component";
import {
  UpdateprojetparchefComponent
} from "./main-layout/Projetpages/updateprojetparchef/updateprojetparchef.component";
import {MatacheComponent} from "./main-layout/Tachespages/matache/matache.component";
import {MonequipeComponent} from "./main-layout/equipepages/monequipe/monequipe.component";
import {MesequipeComponent} from "./main-layout/equipepages/mesequipe/mesequipe.component";
import {CalendarComponent} from "./main-layout/planningpages/calendar/calendar.component";

const routes: Routes = [
  { path: '', redirectTo: '/main/home', pathMatch: 'full' },
  {
    path: 'main',
    component: MainLayoutComponent,
    canActivate:[AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },

      // page demande
      { path: 'mesdemandes', component: MesdemandeComponent },
      { path: 'listdemande', component: ListdemandeComponent },
      { path: 'creedemande', component: CreedemandeComponent },
      { path: 'consulterdemande/:id', component: ShowdemandeComponent },
      { path: 'updatedemande/:id', component: UpdatedemandeComponent },

      // page user
      { path: 'userlist', component: UserlistComponent },
      { path: 'modifieruser/:userid', component: ModifieruserComponent },
      { path: 'monprofile',component:MonprofileComponent},
      { path: 'listeemployee',component:ListeemployeComponent},

      // page membre
      { path: 'creemembre', component: CreateMembreComponent },
      { path: 'listmembre', component: ListmembreComponent },

      // page notes
      { path: 'listenote',component:ListenoteComponent},
      { path: 'ajouternote',component:AjouternoteComponent},

      //page events
      { path: 'listeevents',component:ListeeventsComponent},
      { path: 'ajouterevent',component:AjoutereventComponent},

      // page presence
      { path: 'presence',component:ListpresenceComponent},
      { path: 'mespresence',component:MespresencesComponent},

      // page equipe
      { path: 'creeequipe',component:CreeequipeComponent},
      { path: 'listequipe',component:ListequipeComponent},
      { path: 'updateequipe/:equipeId',component:UpdateequipeComponent},
      { path: 'monequipe/:equipeId',component:MonequipeComponent},
      { path: 'updateequipeparchef/:equipeId',component:UpdateprojetparchefComponent},
      { path: 'mesequipe',component:MesequipeComponent},


      // page tache
      { path: 'creetache/:projectId',component:CreetachesComponent},
      { path: 'listtache/:projectId',component:ListtachesComponent},
      { path: 'mestaches',component:MestachesComponent},
      { path: 'updatetache/:tacheId',component:UpdatetacheComponent},
      { path: 'matache/:tacheId',component:MatacheComponent},

      // page projet
      { path: 'creeprojet', component: CreeprojetComponent },
      { path: 'listprojet', component: ListeprojetComponent },
      { path: 'updateprojet/:id', component: UpdateprojetComponent },
      { path: 'mesprojet',component:MesprojetComponent},
      { path: 'mesprojetparchef',component:MesprojetparchefComponent},
      { path: 'monprojet/:id',component:MonprojetComponent},
      { path: 'updateprojetparchef/:id', component: UpdateprojetparchefComponent },

      // page planning
      { path: 'calendar',component:CalendarComponent},






      { path: '**', redirectTo: '/main/home', pathMatch: 'full' },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgotpassword', component: ForgotpasswordComponent },
      { path: 'newpassword/:code', component: NewpasswordComponent },
      { path: 'verif/:code', component: VerifComponent },
      { path: '**', redirectTo: '/main/home', pathMatch: 'full' },

      // Add more authentication layout routes as needed
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
