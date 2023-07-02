/// <reference types="@types/ckeditor" />
import { Component, OnInit, ViewChild } from '@angular/core';
import { CKEditorComponent } from 'ng2-ckeditor';
import { GeneratePdfService } from 'src/app/services/generate-pdf.service';
import { pdfRequest } from 'src/app/interfaces/pdf';
import { VariablesService } from "../../services/variables.service"

@Component({
  selector: 'app-create-document',
  templateUrl: './create-document.component.html',
  styleUrls: ['./create-document.component.scss']
})
export class CreateDocumentComponent implements OnInit {

  name = 'ng2-ckeditor';
  ckeConfig = CKEDITOR.config;
  mycontent: string;
  templateName: string;
  log: string = '';
  loading: boolean = false;
  error: string | null = null;
  response: string | null = null;
  responseVariables: any[] = [];
  @ViewChild("myckeditor") ckeditor = CKEditorComponent;
  public userName = '';
  public getUsersData: any;
  public updatePasswordForm: any;

  dropList = [
    {
      id: 'Sender-Name',
      color: '#ff0',
      content: '${Sender Name}',
    }
  ];


  constructor(
    private serviceGeneratePdf: GeneratePdfService,
    private variablesService: VariablesService
  ) {
    this.mycontent = `<p>My html content</p>`;
    this.templateName = "";
  }

  ngOnInit(): void {

    this.ckeConfig = {
      allowedContent: false,
      extraPlugins: 'divarea',
      forcePasteAsPlainText: true,
      removePlugins: 'exportpdf'
    };

    this.getVariables()

  }

  onChange($event: any): void {
    console.log("onChange");

  }
  onPaste($event: any): void {
    console.log("onPaste");
  }





  save() {
    const token = sessionStorage.getItem('accessToken');
    console.log(token);
    const data: pdfRequest = {
      type: 15,
      params: {
        html_code: "<html><body>" + this.mycontent + "</body></html>",
        template_name: this.templateName,
        tab_id: 2,
      }
    }

    this.error = null;
    this.response = null;
    this.loading = true;

    this.serviceGeneratePdf.savePdf(data).subscribe((res) => {
      if (res.statusCode === 200) {
        this.response = 'PDF created successfully';
        this.loading = false;
      } else {
        this.loading = false;
        this.error = 'Error creating PDF';
      }
    })
  }

  drag(ev: any) {
    const dragObj = this.dropList.filter((x) => x.id === ev.currentTarget.id);
    // ev.currentTarget.innerHTML = `<span style="color: ${dragObj[0].color}"><strong>${dragObj[0].content}</strong></span>`;
    const data = `<span style="color: ${dragObj[0].color}"><strong>${dragObj[0].content}</strong></span>`;
    ev.dataTransfer.setData('text/html', data);
  }

  onDrop(ev: any) {
    // const data = ev.dataTransfer.getData('text/html');
    // console.log(data);
    // ev.currentTarget.appendChild(data);
  }

  getVariables() {
    const data = {
      type: 20,
    }
    this.variablesService.getListVars(data).subscribe(response => {
      console.log(response.body)
      this.responseVariables = response.body;

      this.dropList = [];

      for (const item of this.responseVariables) {
        const dropItem = {
          id: item.var_name,
          color: '',
          content: "${"+item.var_name+"}"
        };
  
        this.dropList.push(dropItem);
      }
      
    })
  }



}
