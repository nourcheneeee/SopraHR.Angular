import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';
 
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
  constructor(private authService: AuthServiceService, private router: Router) {}
 
  canActivate(next: ActivatedRouteSnapshot): boolean {
    const userRole = this.authService.getRole();
 
    if (!userRole) {
      this.router.navigate(['/login']);
      return false;
    }
 
    const allowedRoles = next.data['roles'] as Array<string>;
    if (allowedRoles && allowedRoles.includes(userRole)) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}