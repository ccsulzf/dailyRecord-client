import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public name = '';
  public password = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {

  }

  login() {
    this.http.post('/login', { name: this.name, password: this.password }).toPromise().then((data) => {
      if (data) {
        localStorage.setItem('dr_user', JSON.stringify(data));
        this.router.navigateByUrl('/dashboard');
      }
    }, (error) => {

    });
  }

}
