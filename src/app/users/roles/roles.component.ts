import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from "@angular/forms"
import { RolesService } from "../../services/roles.service"
import { permissionsListRequest, rolesListRequest, rolesDeleteRequest, rolesRequest, rolesUpdateRequest } from 'src/app/interfaces/roles';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  rolesForm: FormGroup;
  getRolesData:any;
  getPermissionsData: any;
  role: number = 0;
  permissions: number[] = [];
  status: number = 0;
  messagesError: Message[] = [];
  messagesSuccess: Message[] = [];
  rolePermissions: number[] = [];
  updateRole: boolean = false;
  roleId: number = 0;
  roleName: string = '';
  roleStatus: number = 0;
  updatePermissions: number[] = this.rolePermissions;
  loading = false;
  


  constructor(
    private rolesService: RolesService
  ) {
    this.rolesForm = new FormGroup({
      rolName: new FormControl('', [Validators.required]),
      permissions: new FormControl('')
    })
  }

  ngOnInit(){
    this.getRolesServices();
    this.getPermissions();

    this.rolesForm.get('permissions')?.disable()
  }

  setSelectedRoleStatus(role: number, status: number) {
    this.role = role;
    this.status= status == 1 ? 0 : 1;
  }

  setSelectedPermissions(permissions: number[]) {
    permissions.forEach(permission => {
      if (this.permissions.includes(permission)) {
        this.permissions = this.permissions.filter(p => p !== permission);
      } else {
        this.permissions.push(permission);
      }
    });    
  }
  

  getRolesServices() {
    const data : rolesListRequest = {
      type: 13
    }
    this.rolesService.getRole(data).subscribe(response =>{
      this.getRolesData = response.body;
      console.log(response)
    })
  }

  getPermissions() {
    const data : permissionsListRequest = {
      type: 14
    }
    this.rolesService.getPermissions(data).subscribe(response =>{
      this.getPermissionsData = response.body;
      console.log(response)
    })
  }

  createRole(){
    const data: rolesRequest = { 
      type: 10,
      params:{
        name: this.rolesForm.value.rolName,
        permissions: []///this.permissions
      }
    }
    this.rolesService.createRole(data).subscribe(response =>{
      if(response.statusCode === 200){
        console.log(response);
        this.getRolesServices();
        this.permissions = []     
      }else{
        console.log(response);
        this.permissions = []
      }
    }) 
 }

 updateRolePermissions(){
  const data: rolesUpdateRequest = { 
    type: 11,
    params: {
        role_id: this.roleId,
        name: this.roleName,
        permissions: this.updatePermissions,
        status: this.roleStatus
    }
  }  
  
  this.rolesService.updateRole(data).subscribe(response =>{
    if(response.statusCode === 200){
      console.log(response);
      this.loading = true;
        setTimeout(() => {
          location.reload();
        }, 2000); 
      this.rolePermissions = [];
      this.updatePermissions =[];     
    }else{
      console.log(response);
      this.loading = true;
        setTimeout(() => {
          location.reload();
        }, 2000);
    }
  }) 
}

  resetForm(formulario : FormGroup) {
    formulario.reset();
  }


  changeRoleStatus(){
    const data: rolesDeleteRequest = {
      type: 12,
      params: {
        role_id: this.role,
        status: this.status
      }
    }
    this.rolesService.deleteRole(data).subscribe(response =>{
      if(response.statusCode === 200){
        console.log(response);
        this.loading = true;
        setTimeout(() => {
          location.reload();
        }, 2000);      
      }else{
        console.log(response);
        this.loading = true;
        setTimeout(() => {
          location.reload();
        }, 2000);        
      }

      
    })
    
  }

  rolePermissionsUpdate(permissions: number[]){    
    permissions.forEach(permission => {
      if (this.updatePermissions.includes(permission)) {
        this.updatePermissions = this.updatePermissions.filter(p => p !== permission);        
      } else {
        this.updatePermissions.push(permission);
      }
    });  
  }
  

  fillPermissions(getPermissionsId: any[]) {
    this.rolePermissions = [];
    this.rolePermissions.splice(0, this.rolePermissions.length);
    getPermissionsId.forEach(permission => {
      this.rolePermissions.push(permission.permission_id);
    });
    
    this.updatePermissions = this.rolePermissions;
    this.rolesForm.get('permissions')?.enable()
    
  }

  setDataSelectedRole(role: number, name: string, status: number){
    this.roleId = role;
    this.roleName = name;
    this.roleStatus =status
  }

  isSelected(permissionId: number): boolean {
    return this.rolePermissions.includes(permissionId);
  }

  permissionsNotBlank (){
    if(this.updatePermissions.length !== 0 || null){
      return true
    } else{
      return false
    }
  }
  
  
}
