import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {
  baseUrl = 'http://localhost:3000/users/';
  loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  register(firstname: string, lastname: string, username: string, password: string) {
    return this.http.post(this.baseUrl + 'register',
      {'username': username, 'password': password, 'firstname': firstname, 'lastname': lastname});
  }

  login(username: string, password: string) {
    return this.http.post(this.baseUrl + 'login', {'username': username, 'password': password});
  }

  logout() {
    return this.http.get(this.baseUrl + 'logout');
  }

  get isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      this.loggedIn.next(true);
    }
    return this.loggedIn.asObservable();
  }
}
