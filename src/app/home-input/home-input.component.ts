import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EventsDataService } from '../shared/events-data.service';
import { Events } from '../shared/events.model';

@Component({
  selector: 'app-home-input',
  templateUrl: './home-input.component.html',
  styleUrls: ['./home-input.component.css']
})
export class HomeInputComponent implements OnInit {
  event: Events;
  constructor(private eventsDataService: EventsDataService) { }

  ngOnInit() {
  }

  onAddEvent(form: NgForm) {
    const value = form.value;
    if (value.content) {
      const d = new Date();
      const event = new Events();
      event.content = value.content;
      event.title = value.title;
      event.id = null;
      this.eventsDataService.addEvent(event)
        .subscribe(
          () => {
              this.event = {id: '', title: form.value.title, content: form.value.content, date: d + '', favorite: false};
              form.reset();
          }
        );
    }
  }
}
