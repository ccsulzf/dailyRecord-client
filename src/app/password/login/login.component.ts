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
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(6)]],
    confirmPWD: ['', [Validators.required]],
  }, {
    validator: this.checkIfMatchingPasswords('password', 'confirmPWD')
  });

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      const passwordInput = group.controls[passwordKey];
      const passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true });
      } else {
        if (passwordConfirmationInput.value) {
          return passwordConfirmationInput.setErrors(null);
        } else {
          return passwordConfirmationInput.setErrors({ required: true });
        }
      }
    }
  }
  ngOnInit() {

  }

  login() {

    // this.http.post('/login', { name: this.name, password: this.password }).toPromise().then((data) => {
    //   if (data) {
    //     localStorage.setItem('dr_user', JSON.stringify(data));
    //     this.router.navigateByUrl('/dashboard');
    //   }
    // }, (error) => {

    // });
  }

  register() {
    console.log(this.registerForm);
  }

}
