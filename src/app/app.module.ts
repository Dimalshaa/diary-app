import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { SuiSidebarModule } from 'ng2-semantic-ui';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DiaryContentComponent } from './diary-content/diary-content.component';
import { EventsComponent } from './diary-content/events/events.component';
import { HomeInputComponent } from './home-input/home-input.component';
import { EventsDataService } from './shared/events-data.service';
import { EditEventComponent } from './diary-content/edit-event/edit-event.component';
import { EventComponent } from './diary-content/events/event/event.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeInputComponent },
  { path: 'diary', component: DiaryContentComponent, children: [
    { path: 'events', component: EventsComponent },
    { path: 'edit/:id', component: EditEventComponent }
  ]},
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
    EventComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    SuiSidebarModule
  ],
  providers: [EventsDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
