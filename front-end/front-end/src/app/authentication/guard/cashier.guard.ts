import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CashierGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let hasCashier: number = 0;
    return this.authService.user.pipe(take(1), map(user => {
      for (var i = 0; i < user.getRole().length; i++) {
        if (user.getRole()[i] == 'CASHIER') {
          hasCashier++;
        }
      }
      if (hasCashier != 0) {
        return true;
      }
      return this.router.createUrlTree(['home/access-denied']);
    }))
  }

}
