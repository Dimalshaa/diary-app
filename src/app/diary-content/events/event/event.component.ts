import { Component, Input, OnInit } from '@angular/core';
import { Events } from '../../../shared/events.model';
import { EventsDataService } from '../../../shared/events-data.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  @Input() event: Events;
  @Input() contentLength: number;

  constructor(private eventDataService: EventsDataService) { }

  ngOnInit() {
  }

  onDelete(event: Events) {
    this.eventDataService.onDelete(event.id)
      .subscribe(
        () => this.eventDataService.eventDelSub.next(event)
      );
  }

  toggleFav(event: Events) {
    this.eventDataService.editEvent({...event, favorite: !event.favorite})
      .subscribe(
        () => this.eventDataService.favTogSub.next(event)
      );
  }
}
