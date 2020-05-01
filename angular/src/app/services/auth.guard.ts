import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service'; //changed here with my naming

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate() {
    if(this.auth.loggedin()) { //changed here with my naming
      return true;
    } else {
      this.router.navigate(['unauthorized']);
      return false;
    }
  }
}
