import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { resolve } from 'url';
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  getRouteParam$: Observable<any>;
  getRouteParamSub: Subscription;

  verifyEmailType = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.getRouteParam$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return new Promise((resolve) => resolve(params.get('code')));
      })
    );

    this.getRouteParamSub = this.getRouteParam$.subscribe((data) => {
      this.http.get(`/verifyEmail?code=${data}`).toPromise().then((data) => {
        this.verifyEmailType = data ? 1 : 2;
      });
    });
  }

  returnLogin() {
    this.router.navigateByUrl('/login');
  }

  ngOnDestroy(): void {
    if (this.getRouteParamSub) {
      this.getRouteParamSub.unsubscribe();
    }
  }
}
