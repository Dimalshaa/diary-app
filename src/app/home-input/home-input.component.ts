import {Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EventsDataService } from '../events-data.service';
import { Events } from '../events.model';

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
    if(value.content) {
      this.eventsDataService.addEvent(value.title, value.content)
        .subscribe(
          (response) => {
            if (response.status === 200) {
              this.event = {_id: response.text(), title: form.value.title, content: form.value.content, favorite: false};
              form.reset();
            }
          }
        );
    }
  }
}