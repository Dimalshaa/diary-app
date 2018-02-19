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
  @Output() eventDeleted = new EventEmitter<Events>();
  @Output() favClicked = new EventEmitter<Events>();
  constructor(private eventDataService: EventsDataService) { }

  ngOnInit() {
  }

  onDelete(event: Events) {
    this.eventDataService.onDelete(event._id)
      .subscribe(
        (resp) => {
          this.eventDeleted.emit(event);
        },
        (error) => console.log(error)
      );
  }
  toggleFav(event: Events) {
    this.eventDataService.editEvent(event._id, event.title, event.content, event.date, !event.favorite)
      .subscribe(
        (response) => {
          if (response.status === 200) {
            this.favClicked.emit(event);
          }
        }
      );
  }
}
