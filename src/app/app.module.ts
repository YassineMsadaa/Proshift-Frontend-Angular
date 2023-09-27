import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { HomeComponent } from './main-layout/home/home.component';
import { LoginComponent } from './auth-layout/login/login.component';
import { RegisterComponent } from './auth-layout/register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { NewpasswordComponent } from './auth-layout/newpassword/newpassword.component';
import { ForgotpasswordComponent } from './auth-layout/forgotpassword/forgotpassword.component';
import { FooterComponent } from './main-layout/footer/footer.component';
import { NavbarComponent } from './main-layout/navbar/navbar.component';
import { SidebarComponent } from './main-layout/sidebar/sidebar.component';
import {MesdemandeComponent} from "./main-layout/demandepages/mesdemande/mesdemande.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { DateOnlyPipe } from './pipes/date-only.pipe';
import { UserlistComponent } from './main-layout/userpages/userlist/userlist.component';
import {CommonModule} from "@angular/common";
import { ListeemployeComponent } from './main-layout/listeemploye/listeemploye.component';
import { UpdateEmployeComponent } from './main-layout/listeemploye/update-employe/update-employe.component';
import { ListeeventsComponent } from './main-layout/listeevents/listeevents.component';
import { UpdateEventModalComponent } from './main-layout/listeevents/update-event-modal/update-event-modal.component';
import { ConsulterEventModalComponent } from './main-layout/listeevents/consulter-event-modal/consulter-event-modal.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ListenoteComponent } from './main-layout/listenote/listenote.component';
import { UpdateNoteModalComponent } from './main-layout/listenote/update-note-modal/update-note-modal.component';
import { AjouternoteComponent } from './main-layout/ajouternote/ajouternote.component';
import { AjoutereventComponent } from './main-layout/ajouterevent/ajouterevent.component';
import { CreedemandeComponent } from './main-layout/demandepages/creedemande/creedemande.component';
import { ShowdemandeComponent } from './main-layout/demandepages/showdemande/showdemande.component';
import { ListdemandeComponent } from './main-layout/demandepages/listdemande/listdemande.component';
import { UpdatedemandeComponent } from './main-layout/demandepages/updatedemande/updatedemande.component';
import { CreeprojetComponent } from './main-layout/Projetpages/creeprojet/creeprojet.component';
import { ListeprojetComponent } from './main-layout/Projetpages/listeprojet/listeprojet.component';
import { ListmembreComponent } from './main-layout/membrepages/listmembre/listmembre.component';
import { CreateMembreComponent } from './main-layout/membrepages/create-membre/create-membre.component';
import { DateuserPipe } from './pipes/dateuser.pipe';
import { ModifieruserComponent } from './main-layout/userpages/modifieruser/modifieruser.component';
import { VerifComponent } from './auth-layout/verif/verif.component';
import { MonprofileComponent } from './main-layout/userpages/monprofile/monprofile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSlideToggle, MatSlideToggleModule} from "@angular/material/slide-toggle";
import { ListpresenceComponent } from './main-layout/presencespages/listpresence/listpresence.component';
import { MespresencesComponent } from './main-layout/presencespages/mespresences/mespresences.component';
import { TimeOnlyPipe } from './pipes/time-only.pipe';
import { TimeFormatPipe } from './pipes/time-format.pipe';
import {CreeequipeComponent} from "./main-layout/equipepages/creeequipe/creeequipe.component";
import { ListequipeComponent } from './main-layout/equipepages/listequipe/listequipe.component';
import { UpdateequipeComponent } from './main-layout/equipepages/updateequipe/updateequipe.component';
import { UpdateprojetComponent } from './main-layout/Projetpages/updateprojet/updateprojet.component';
import { UpdatetacheComponent } from './main-layout/Tachespages/updatetache/updatetache.component';
import { CreetachesComponent } from './main-layout/Tachespages/creetaches/creetaches.component';
import { ListtachesComponent } from './main-layout/Tachespages/listtaches/listtaches.component';
import { MestachesComponent } from './main-layout/Tachespages/mestaches/mestaches.component';
import { MatacheComponent } from './main-layout/Tachespages/matache/matache.component';
import { MesprojetComponent } from './main-layout/Projetpages/mesprojet/mesprojet.component';
import { MonprojetComponent } from './main-layout/Projetpages/monprojet/monprojet.component';
import { MesprojetparchefComponent } from './main-layout/Projetpages/mesprojetparchef/mesprojetparchef.component';
import { UpdateprojetparchefComponent } from './main-layout/Projetpages/updateprojetparchef/updateprojetparchef.component';
import { MesequipeComponent } from './main-layout/equipepages/mesequipe/mesequipe.component';
import { MonequipeComponent } from './main-layout/equipepages/monequipe/monequipe.component';
import { UpdateequipeparchefComponent } from './main-layout/equipepages/updateequipeparchef/updateequipeparchef.component';
import {FullCalendarModule} from "@fullcalendar/angular";
import {CalendarComponent} from "./main-layout/planningpages/calendar/calendar.component";

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    AuthLayoutComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NewpasswordComponent,
    ForgotpasswordComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    MesdemandeComponent,
    DateOnlyPipe,
    UserlistComponent,
    VerifComponent,
    ModifieruserComponent,
    DateuserPipe,
    CreateMembreComponent,
    ListmembreComponent,
    CreeprojetComponent,
    ListeprojetComponent,
    UpdatedemandeComponent,
    ListdemandeComponent,
    ShowdemandeComponent,
    CreedemandeComponent,
    AppComponent,
    MainLayoutComponent,
    AuthLayoutComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NewpasswordComponent,
    ForgotpasswordComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    MesdemandeComponent,
    DateOnlyPipe,
    UserlistComponent,
    ListeemployeComponent,
    UpdateEmployeComponent,
    ListeeventsComponent,
    UpdateEventModalComponent,
    ConsulterEventModalComponent,
    ListenoteComponent,
    UpdateNoteModalComponent,
    AjouternoteComponent,
    AjoutereventComponent,
    CreedemandeComponent,
    ShowdemandeComponent,
    ListdemandeComponent,
    UpdatedemandeComponent,
    CreeprojetComponent,
    ListeprojetComponent,
    ListmembreComponent,
    CreateMembreComponent,
    DateuserPipe,
    ModifieruserComponent,
    VerifComponent,
    MonprofileComponent,
    ListpresenceComponent,
    MespresencesComponent,
    TimeOnlyPipe,
    TimeFormatPipe,
    CreeequipeComponent,
    ListequipeComponent,
    UpdateequipeComponent,
    UpdateprojetComponent,
    UpdatetacheComponent,
    CreetachesComponent,
    ListtachesComponent,
    MestachesComponent,
    MatacheComponent,
    MesprojetComponent,
    MonprojetComponent,
    MesprojetparchefComponent,
    UpdateprojetparchefComponent,
    MesequipeComponent,
    MonequipeComponent,
    UpdateequipeparchefComponent,
    CalendarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CommonModule,
    NgSelectModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    FullCalendarModule
  ],
  providers: [DateuserPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
