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
    const token = JSON.parse(localStorage.getItem('currentUser')).token;
    const head = new HttpHeaders().set('Content-type', 'application/json').append('x-access-token',token);
    const URI = `${this.serverAPI}/event/${eventID}`;
    return this.http.get<Events>(URI, {headers: head});
  }

  getAllEvent() {
    const token = JSON.parse(localStorage.getItem('currentUser')).token;
    const head = new HttpHeaders().set('Content-type', 'application/json').append('x-access-token',token);
    const URI = `${this.serverAPI}/event`;
    return this.http.get<Events[]>(URI, {headers: head});
  }

  addEvent(title: string, content: string, date: string) {
    const token = JSON.parse(localStorage.getItem('currentUser')).token;
    const head = new HttpHeaders().set('Content-type', 'application/json').append('x-access-token',token);
    const URI = `${this.serverAPI}/event`;
    const body = JSON.stringify({title: title, content: content, date: date, favorite: false});
    return this.http.post(URI, body, {headers: head});
  }

  onDelete(eventID: string) {
    const token = JSON.parse(localStorage.getItem('currentUser')).token;
    const head = new HttpHeaders().set('Content-type', 'application/json').append('x-access-token',token);
    const URI = `${this.serverAPI}/event/${eventID}`;
    return this.http.delete(URI, {headers: head});
  }

  editEvent(eventID: string, title: string, content: string, fav: boolean) {
    const URI = `${this.serverAPI}/event/${eventID}`;
    const token = JSON.parse(localStorage.getItem('currentUser')).token;
    const head = new HttpHeaders().set('Content-type', 'application/json').append('x-access-token',token);
    const body = JSON.stringify({title: title, content: content, favorite: fav});
    return this.http.put(URI, body, {headers: head});
  }
}
