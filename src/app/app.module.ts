import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ClarityModule } from '@clr/angular';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DiaryContentComponent } from './diary-content/diary-content.component';
import { EventsComponent } from './diary-content/events/events.component';
import { HomeInputComponent } from './home-input/home-input.component';
import { EventsDataService } from './shared/events-data.service';
import { EditEventComponent } from './diary-content/edit-event/edit-event.component';
import { EventComponent } from './diary-content/events/event/event.component';
import { ViewEventComponent } from './diary-content/view-event/view-event.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './shared/auth.service';
import { AuthGuard } from './shared/auth-gaurd';

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', canActivate: [AuthGuard], component: HomeInputComponent },
  { path: 'diary', canActivate: [AuthGuard], component: DiaryContentComponent, children: [
    { path: 'events', component: EventsComponent },
    { path: 'edit/:id', component: EditEventComponent },
    { path: 'view/:id', component: ViewEventComponent },
    { path: '**', redirectTo: 'events' }
  ]},
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DiaryContentComponent,
    EventsComponent,
    HomeInputComponent,
    EditEventComponent,
    EventComponent,
    ViewEventComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    ClarityModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [AuthGuard, EventsDataService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
