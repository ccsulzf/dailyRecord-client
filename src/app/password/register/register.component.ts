import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, Validators, ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isRegisterSuccess = false;
  registerForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(6)]],
    confirmPWD: ['', [Validators.required]],
  }, {
    validator: this.checkIfMatchingPasswords('password', 'confirmPWD')
  });


  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }

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

  register() {
    this.http.post('/register', this.registerForm.value).toPromise().then((data: any) => {
      if (data.success) {
        this.isRegisterSuccess = true;
      }
    }, (error) => {

    });
  }

  gotoLogin() {
    this.router.navigateByUrl('/login');
  }
}
