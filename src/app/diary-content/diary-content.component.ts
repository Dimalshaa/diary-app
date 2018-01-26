import {Component, OnInit } from '@angular/core';
import {EventsDataService} from '../shared/events-data.service';
import {Events} from '../shared/events.model';

@Component({
  selector: 'app-diary-content',
  templateUrl: './diary-content.component.html',
  styleUrls: ['./diary-content.component.css']
})
export class DiaryContentComponent implements OnInit {
  eventData: Events[];
  constructor(private eventsDataService: EventsDataService) { }

  ngOnInit() {
    this.eventsDataService.getAllEvent()
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
