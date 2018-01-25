import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Events } from '../../events.model';
import { EventsDataService } from '../../events-data.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
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
    this.eventDataService.editEvent(event._id, event.title, event.content, !event.favorite)
      .subscribe(
        (response) => {
          if (response.status === 200) {
            this.favClicked.emit(event);
          }
        }
      );
  }
}
