import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {LoginComponent} from "./login.component";

@Injectable({
  providedIn: 'root'
})
export class ProtectLoginGuard implements CanDeactivate<unknown> {
  constructor(private route: Router) {
  }
  canDeactivate(
    component: LoginComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(component.leavePage){
      return true;
    }
    else {
      this.route.navigate(['login']);
      alert('Please connect You!');
      return false;
    }
  }

}
