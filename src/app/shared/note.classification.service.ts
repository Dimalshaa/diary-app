import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Events } from './events.model';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NoteClassificationService {
  serverAPI = 'http://localhost:8000';
  eventDelSub = new Subject<Events>();
  favTogSub = new Subject<Events>();

  constructor(private http: HttpClient) {}

  getClassification(note): Observable<any> {
    const token = JSON.parse(localStorage.getItem('currentUser')).token;
    const head = new HttpHeaders().set('Content-type', 'application/json').append('Authorization', 'Bearer ' + token);
    const URI = `${this.serverAPI}/classify`;
    return this.http.post(URI, {note}, {headers: head});
  }

}
