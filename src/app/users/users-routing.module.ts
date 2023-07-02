import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCrudComponent } from './user-crud/user-crud.component';
import { RolesComponent } from './roles/roles.component';
import { AuthLoginGuard } from '../guards/auth-login.guard';

const routes: Routes = [
  { path:'users', component: UserCrudComponent, canActivate:[AuthLoginGuard], data:{params: 7}},
  { path:'roles', component: RolesComponent, canActivate:[AuthLoginGuard], data:{params: 8}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
