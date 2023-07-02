import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserCrudComponent } from './user-crud/user-crud.component';
import { RolesComponent } from './roles/roles.component';
import { SharedModule } from '../shared/shared.module';

import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    UserCrudComponent,
    RolesComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    DataTablesModule
  ]
})
export class UsersModule { }
