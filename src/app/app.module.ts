import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http'
import { PortalModule } from './portal/portal.module';
import { AuthLoginGuard } from './guards/auth-login.guard';
import { CreateVariablesComponent } from './variables/create-variables/create-variables.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { SharedModule } from './shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { NgChartsModule } from 'ng2-charts';
import { CreateComparableComponent } from './create-comparable/create-comparable.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CreateAnalysisComponent } from './create-analysis/create-analysis.component';
import { ExplorerComponent } from './explorer/explorer.component';
import { AnalysisCreateComponent } from './analysis-create/analysis-create.component';
import { SeekerComponent } from './analysis-create/components/seeker/seeker.component';
import { MaterialModule } from './modules/material/material.module';
import { ItemListComponent } from './analysis-create/components/item-list/item-list.component';
import { CommonModule } from '@angular/common';
import { OutsideClickDirective } from './directives/outside-click-directive.directive';
import { DialogNewItem } from './analysis-create/components/dialog-new-item/dialog-new-item';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CreateVariablesComponent,
    CreateComparableComponent,
    CreateAnalysisComponent,
    ExplorerComponent,
    AnalysisCreateComponent,
    SeekerComponent,
    ItemListComponent,
    OutsideClickDirective,
    DialogNewItem
  ],

  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MessageModule,
    MessagesModule,    
    PortalModule,
    SharedModule,
    DataTablesModule,
    NgChartsModule,
    MaterialModule,
    MatDialogModule

  ],
  exports: [
  ],
  providers: [AuthLoginGuard], 
    bootstrap: [AppComponent]
})
export class AppModule { }
