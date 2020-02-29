import { UsermgmtService } from 'src/app/services/usermgmt.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccessGuard implements CanActivate {

  constructor(private userService: UsermgmtService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const requiresLogin = next.data.requiresLogin || false;
      if (requiresLogin) {
        if (!this.userService.isLoggedIn()) {
          this.router.navigate(['/login']);
          return false;
        }
      }
      return true;
  }

}
