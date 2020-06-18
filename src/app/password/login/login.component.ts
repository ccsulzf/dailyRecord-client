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
    this.http.post('/login', this.loginForm.value).toPromise().then((data) => {
      if (data) {
        localStorage.setItem('dr_user', JSON.stringify(data));
        this.router.navigateByUrl('/dashboard');
      }
    }, (error) => {

    });
  }


  gotoRegister() {
    this.router.navigateByUrl('/register');
  }
}
