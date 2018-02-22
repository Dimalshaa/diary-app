import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Events } from './events.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class EventsDataService {
  serverAPI = 'http://localhost:3000';
  eventDelSub = new Subject<Events>();
  favTogSub = new Subject<Events>();

  constructor(private http: HttpClient) {}

  getEvent(eventID: string) {
    const URI = `${this.serverAPI}/event/${eventID}`;
    return this.http.get<Events>(URI);
  }

  getAllEvent() {
    const URI = `${this.serverAPI}/event`;
    return this.http.get<Events[]>(URI);
  }

  addEvent(title: string, content: string, date: string) {
    const URI = `${this.serverAPI}/event`;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    const body = JSON.stringify({title: title, content: content, date: date, favorite: false});
    return this.http.post(URI, body, {headers: headers});
  }

  onDelete(eventID: string) {
    const URI = `${this.serverAPI}/event/${eventID}`;
    return this.http.delete(URI);
  }

  editEvent(eventID: string, title: string, content: string, fav: boolean) {
    const URI = `${this.serverAPI}/event/${eventID}`;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    const body = JSON.stringify({title: title, content: content, favorite: fav});
    return this.http.put(URI, body, {headers: headers});
  }
}
