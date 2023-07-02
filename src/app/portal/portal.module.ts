import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortalRoutingModule } from './portal-routing.module';
import { CreateDocumentComponent } from './create-document/create-document.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CreateDocumentComponent,

  ],
  imports: [
    CommonModule,
    PortalRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularEditorModule,
    CKEditorModule,
    SharedModule
    
  ],
  exports: [

  ]
})
export class PortalModule { }
