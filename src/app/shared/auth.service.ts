import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
// import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

@Injectable()
export class AuthService {
  baseUrl = 'http://localhost:8080/';
  loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  register(firstname: string, lastname: string, username: string, password: string) {
    return this.http.post(this.baseUrl + 'register',
      {'username': username, 'password': password, 'firstname': firstname, 'lastname': lastname});
  }

  login(username: string, password: string) {
    return this.http.post(this.baseUrl + 'api/authenticate', {'username': username, 'password': password, rememberMe: false});
  }

  logout() {
    // return this.http.get(this.baseUrl + 'logout');
    return new Observable(observer => {
      observer.next({success: true});
    });
  }

  get isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      this.loggedIn.next(true);
    }
    return this.loggedIn.asObservable();
  }
}
