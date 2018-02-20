import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Events } from '../../../shared/events.model';
import { EventsDataService } from '../../../shared/events-data.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  @Input() event: Events;
  value = 2500;

  constructor(private eventDataService: EventsDataService) { }

  ngOnInit() {
  }

  onDelete(event: Events) {
    this.eventDataService.onDelete(event._id)
      .subscribe(
        () => this.eventDataService.eventDelSub.next(event)
      );
  }

  toggleFav(event: Events) {
    this.eventDataService.editEvent(event._id, event.title, event.content, event.date, !event.favorite)
      .subscribe(
        () => this.eventDataService.favTogSub.next(event)
      );
  }
}
