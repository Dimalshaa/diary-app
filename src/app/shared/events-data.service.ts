import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Events } from './events.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class EventsDataService {
  serverAPI = 'http://localhost:8080';
  eventDelSub = new Subject<Events>();
  favTogSub = new Subject<Events>();

  constructor(private http: HttpClient) {}

  getEvent(eventID: string) {
    const token = JSON.parse(localStorage.getItem('currentUser')).token;
    const head = new HttpHeaders().set('Content-type', 'application/json').append('Authorization', 'Bearer ' + token);
    const URI = `${this.serverAPI}/api/event/${eventID}`;
    return this.http.get<Events>(URI, {headers: head});
  }

  getAllEvent() {
    const token = JSON.parse(localStorage.getItem('currentUser')).token;
    const head = new HttpHeaders().set('Content-type', 'application/json').append('Authorization', 'Bearer ' + token);
    const URI = `${this.serverAPI}/api/events`;
    return this.http.get<Events[]>(URI, {headers: head});
  }

  addEvent(event: Events) {
    const token = JSON.parse(localStorage.getItem('currentUser')).token;
    const head = new HttpHeaders().set('Content-type', 'application/json').append('Authorization', 'Bearer ' + token);
    const URI = `${this.serverAPI}/api/event`;
    return this.http.post(URI, event, {headers: head});
  }

  onDelete(eventID: string) {
    const token = JSON.parse(localStorage.getItem('currentUser')).token;
    const head = new HttpHeaders().set('Content-type', 'application/json').append('Authorization', 'Bearer ' + token);
    const URI = `${this.serverAPI}/api/event/${eventID}`;
    return this.http.delete(URI, {headers: head});
  }

  editEvent(event: Events) {
    const URI = `${this.serverAPI}/api/event/${event.id}`;
    const token = JSON.parse(localStorage.getItem('currentUser')).token;
    const head = new HttpHeaders().set('Content-type', 'application/json').append('Authorization', 'Bearer ' + token);
    // const body = JSON.stringify({title: title, content: content, favorite: fav});
    return this.http.put(URI, event, {headers: head});
  }
}
