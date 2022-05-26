import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router
  ) { }
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

    if(this.authService.getToken())
    {
      try{
        const response = await this.authService.confirmToken();
        console.log(response);
      }
      catch(error)
      {
        console.log(error);
      }
    }
    if (!this.authService.gettoken()) {
      this.router.navigateByUrl('/log-in');
    }
    return this.authService.gettoken();
  }
}
