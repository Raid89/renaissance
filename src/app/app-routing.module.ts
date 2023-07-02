import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {  AuthLoginGuard } from './guards/auth-login.guard';
import { CreateVariablesComponent } from './variables/create-variables/create-variables.component';
import { CreateComparableComponent } from './create-comparable/create-comparable.component';
import { CreateAnalysisComponent } from './create-analysis/create-analysis.component';
import { ExplorerComponent } from './explorer/explorer.component';
import { AnalysisCreateComponent } from './analysis-create/analysis-create.component';

const routes: Routes = [

  {path:'', component: HomeComponent, canActivate:[AuthLoginGuard], data:{params: 1}},
  { path:'login', component: LoginComponent},
  { path: '', loadChildren: ()=> import('./users/users.module').then(m => m.UsersModule)},
  { path: '', loadChildren: ()=> import('./portal/portal.module').then(m => m.PortalModule), 
  canActivate:[AuthLoginGuard], data:{params: 8}},
  { path:'create-variable', component: CreateVariablesComponent, 
  canActivate:[AuthLoginGuard], data:{params: 2}},
  { path:'create-comparable', component: CreateComparableComponent, 
  canActivate:[AuthLoginGuard], data:{params: 4}},
  { path:'create-analysis', component: AnalysisCreateComponent, 
  },
  { path:'explorer', component: ExplorerComponent, 
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
