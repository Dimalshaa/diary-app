import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventsDataService } from '../../shared/events-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Events } from '../../shared/events.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.css']
})
export class ViewEventComponent implements OnInit, OnDestroy {
  eventData: Events;
  delSub: Subscription;
  favSub: Subscription;
  constructor(private eventDataService: EventsDataService, private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.eventDataService.getEvent(id)
    .subscribe(
      (events: Events) => {
        this.eventData = events;
      },
      (error) => console.log(error)
    );
    this.delSub = this.eventDataService.eventDelSub.subscribe(
      (event: Events) => this.router.navigate(['/diary', 'events'])
    );
    this.favSub = this.eventDataService.favTogSub.subscribe(
      (event: Events) => this.eventData.favorite = !this.eventData.favorite
    );
  }
  ngOnDestroy() {
    this.delSub.unsubscribe();
    this.favSub.unsubscribe();
  }
}
