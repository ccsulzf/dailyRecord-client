import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { resolve } from 'url';
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  getRouteParam$: Observable<any>;
  getRouteParamSub: Subscription;
  code;
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getRouteParam$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return new Promise((resolve) => resolve(params.get('code')));
      })
    );

    this.getRouteParamSub = this.getRouteParam$.subscribe((data) => {
      console.log(data);
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
