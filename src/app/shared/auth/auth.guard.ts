import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    let response;
    if (this.authService.getToken()) {
      try {
        response = await this.authService.confirmToken();
      } catch (error) {
        console.log(error);
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
    if (response && response.success) {
      return true;
    } else {
      this.router.navigateByUrl('/log-in');
      let token = localStorage.getItem('access_token');
      if(token)
      {
        localStorage.removeItem('access_token')
      }
      return false;
    }
  }
}
