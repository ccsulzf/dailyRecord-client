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
    nameOrEmail: ['', Validators.required],
    password: ['', Validators.required]
  });

  ngOnInit() {

  }

  login() {
    this.http.post('/auth/login', this.loginForm.value).toPromise().then((data) => {
      console.log(data);
      if (data) {
        localStorage.setItem('', JSON.stringify(data));
        this.router.navigateByUrl('/dashboard');
        this.isLoginError = false;
      } else {
        this.isLoginError = true;
      }
    }, (error) => {

    });
  }


  gotoRegister() {
    this.router.navigateByUrl('/register');
  }
}
