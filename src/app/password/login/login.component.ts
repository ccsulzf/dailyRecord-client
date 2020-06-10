import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { equalValidator } from './equal.directive';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoginForm = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder
  ) { }

  loginForm = this.fb.group({
    nameOrEmail: ['', Validators.required],
    password: ['', Validators.required]
  });

  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPWD: ['', [
      Validators.required,
      equalValidator(123)
    ]],
  });


  ngOnInit() {

  }

  login() {
    console.log(this.loginForm.valid);
    // this.http.post('/login', { name: this.name, password: this.password }).toPromise().then((data) => {
    //   if (data) {
    //     localStorage.setItem('dr_user', JSON.stringify(data));
    //     this.router.navigateByUrl('/dashboard');
    //   }
    // }, (error) => {

    // });
  }

  register() {
    console.log(this.registerForm.valid);
  }

}
