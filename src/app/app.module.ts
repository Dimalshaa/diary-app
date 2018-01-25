import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from "@angular/http";

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DiaryContentComponent } from './diary-content/diary-content.component';
import { TimelineComponent } from './diary-content/timeline/timeline.component';
import { EventsComponent } from './diary-content/events/events.component';
import { HomeInputComponent } from './home-input/home-input.component';
import { EventsDataService } from './events-data.service';
import { EditEventComponent } from './edit-event/edit-event.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeInputComponent },
  { path: 'diary', component: DiaryContentComponent },
  { path: 'edit-diary/:id', component: EditEventComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DiaryContentComponent,
    TimelineComponent,
    EventsComponent,
    HomeInputComponent,
    EditEventComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpModule
  ],
  providers: [EventsDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
