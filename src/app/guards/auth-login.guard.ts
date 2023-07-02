import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginGuard {

  static canActivate: any;

  constructor(private router:Router){}

  canActivate(route: ActivatedRouteSnapshot):  boolean {

    const params = route.data.params;

    const token = sessionStorage.getItem('accessToken');
    if (token) {
      const tokenData = JSON.parse(window.atob(token.split('.')[1]));
      const userPermissions = tokenData.permissions;
      const screen = userPermissions.some((permission: { permission_id: any; }) => permission.permission_id === params);  
      if(screen){
        return true
      }else{
        this.router.navigate([''])
        return false
      }
      
    }else {
      this.router.navigate(['/login']);
      return false;
    }

    }  
    
}
