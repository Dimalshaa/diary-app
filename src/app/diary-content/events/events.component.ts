import { Component, OnDestroy, OnInit } from '@angular/core';
import { Events } from '../../shared/events.model';
import { EventsDataService } from '../../shared/events-data.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit, OnDestroy {
  eventData: Events[];
  delSub: Subscription;
  favSub: Subscription;

  constructor(private eventDataService: EventsDataService) { }

  ngOnInit() {
    this.eventDataService.getAllEvent()
      .subscribe(
        (events: Events[]) => {
          this.eventData = events;
        },
        (error) => console.log(error)
      );
    this.delSub = this.eventDataService.eventDelSub.subscribe(
      (event: Events) => this.deleteEvent(event)
    );
    this.favSub = this.eventDataService.favTogSub.subscribe(
      (event: Events) => this.favToggle(event)
    );
  }
  deleteEvent(event: Events) {
    const val = this.eventData.indexOf(event);
    console.log(val);
    this.eventData.splice(val, 1);
  }
  favToggle(event: Events) {
    const val = this.eventData.indexOf(event);
    console.log(this.eventData);
    this.eventData[val].favorite = !this.eventData[val].favorite;
  }

  ngOnDestroy() {
    this.delSub.unsubscribe();
    this.favSub.unsubscribe();
  }
}
