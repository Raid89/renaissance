import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  userPermissions: any[] = [];
  

  constructor(
    private serviceLogin: LoginService
  ){}

  ngOnInit(){
    this.hasPermission();
  }

  logout() {
    this.serviceLogin.logout()      
  }

  hasPermission(){
    const token = sessionStorage.getItem('accessToken');
    if (token) {
      const tokenData = JSON.parse(window.atob(token.split('.')[1]));
      this.userPermissions = tokenData.permissions;      
    }
  }

  screen(permissionId: number): boolean {
    return this.userPermissions.some(permission => permission.permission_id === permissionId);
  }

}
