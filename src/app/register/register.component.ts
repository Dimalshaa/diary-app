import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  regFail = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.isLoggedIn
      .subscribe((check) => {
        if (check) {
          this.router.navigate(['/diary', 'events']);
        }
      });
  }

  onRegister(form: NgForm) {
    this.authService.register(form.value.firstname, form.value.lastname, form.value.username, form.value.password)
      .subscribe((res: {success: boolean, status: string}) => {
        if (res.success) {
          this.router.navigate(['/login']);
        }
      },
        () => this.regFail = true);
  }
}
