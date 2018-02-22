import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFail = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.isLoggedIn
      .subscribe((check) => {
        if (check) {
          this.router.navigate(['/diary', 'events']);
        }
      });
  }

  onLogin(form: NgForm) {
    this.authService.login(form.value.username, form.value.password)
      .subscribe((res: {status: string, success: boolean, token: string}) => {
        const token = res.token;
        if (res.success) {
          this.authService.loggedIn.next(true);
          localStorage.setItem('currentUser', JSON.stringify({ username: form.value.username, token: token }));
          this.router.navigate(['/home']);
        } else {
          this.loginFail = true;
        }
      },
        () => {
        console.log('Check username/password or internet connection');
          this.loginFail = true;
        });
  }
}
