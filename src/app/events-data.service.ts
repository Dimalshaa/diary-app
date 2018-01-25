import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class EventsDataService {
  serverAPI = 'http://localhost:3000';

  constructor(private http: Http, private router: Router) {}

  addEvent(title: string, content: string, date: string) {
    // this.events.push(new Events(title,content));
    const URI = `${this.serverAPI}/event`;
    const headers = new Headers({'Content-type' : 'application/json'});
    const body = JSON.stringify({title: title, content: content, date: date, favorite: false});
    return this.http.post(URI, body,
      {headers: headers});
  }

  getAllEvent() {
    const URI = `${this.serverAPI}/event`;
    return this.http.get(URI)
      .map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      );
  }
  getEvent(eventID: string) {
    const URI = `${this.serverAPI}/event/${eventID}`;
    return this.http.get(URI)
      .map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      );
  }
  onDelete(eventID: string) {
    const URI = `${this.serverAPI}/event/${eventID}`;
    return this.http.delete(URI);
  }
  editEvent(eventID: string, title: string, content: string, date: string, fav: boolean) {
    const URI = `${this.serverAPI}/event/${eventID}`;
    const headers = new Headers({'Content-type' : 'application/json'});
    const body = JSON.stringify({title: title, content: content, favorite: fav});
    return this.http.put(URI, body,
      {headers: headers});
  }
}
