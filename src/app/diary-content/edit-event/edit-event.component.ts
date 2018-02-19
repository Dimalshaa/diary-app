import { Component, OnInit } from '@angular/core';
import { EventsDataService } from '../../shared/events-data.service';
import { Events } from '../../shared/events.model';
import { NgForm } from '@angular/forms';
import {  ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  eventData: Events;
  constructor(private eventDataService: EventsDataService, private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.eventDataService.getEvent(id)
      .subscribe(
        (events) => {
          this.eventData = events;
        },
        (error) => console.log(error)
      );
  }
  onEditEvent(form: NgForm) {
    const value = form.value;
    if (value.content) {
      this.eventDataService.editEvent(this.eventData._id,
        value.title, value.content, this.eventData.date,
        this.eventData.favorite)
        .subscribe(
          (response) => {
            if (response.status === 200) {
              form.reset();
              this.location.back();
            }
          }
        );
    }
  }
}
