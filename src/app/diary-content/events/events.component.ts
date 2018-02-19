import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Events } from '../../shared/events.model';
import { EventsDataService } from '../../shared/events-data.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  eventData: Events[];
  constructor(private eventDataService: EventsDataService) { }

  ngOnInit() {
    this.eventDataService.getAllEvent()
      .subscribe(
        (events) => {
          this.eventData = events;
        },
        (error) => console.log(error)
      );
  }
  deleteEvent(event: Events) {
    const val = this.eventData.indexOf(event);
    this.eventData.splice(val,1);
  }
  favToggle(event: Events) {
    const val = this.eventData.indexOf(event);
    this.eventData[val].favorite = !this.eventData[val].favorite;
  }
}
