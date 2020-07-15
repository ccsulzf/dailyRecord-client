import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, Validators, ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoginError = false;
  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder
  ) { }

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  ngOnInit() {

  }

  login() {
    console.log(this.loginForm.value);
    this.http.post('/auth/login', this.loginForm.value).toPromise().then((data: any) => {
      console.log(data);
      if (data) {
        localStorage.setItem('access_token', data.access_token);
        this.router.navigateByUrl('/dashboard');
        this.isLoginError = false;
      } else {
        this.isLoginError = true;
      }
    }, (error) => {
      this.isLoginError = false;
    });
  }


  gotoRegister() {
    this.router.navigateByUrl('/register');
  }
}
