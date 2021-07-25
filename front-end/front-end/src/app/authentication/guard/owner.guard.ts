import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OwnerGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let hasOwner: number = 0;
    return this.authService.user.pipe(take(1), map(user=>{
      for(var i=0; i<user.getRole().length; i++){
        if(user.getRole()[i] == 'RESTAURANT_OWNER'){
          hasOwner++;
        }
      }
      if(hasOwner != 0){
        return true;
      }
        return this.router.createUrlTree(['home/access-denied']);
    }))
  }
}
