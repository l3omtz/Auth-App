import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthService } from '../services/auth.service';


@Injectable()

export class AuthGuard implements CanActivate {
  constructor(private _auth: AuthService, private _route: Router) { }

  canActivate() {
    // If is logged in active route
    if (this._auth.loggedIn()) {
      console.log("success");
      return true;
    } else { // <- If not navigate to login page
      console.log("false");
      this._route.navigate(['/login']);
      return false;
    }
  }
}
