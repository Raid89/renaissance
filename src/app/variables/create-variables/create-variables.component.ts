import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VariablesService } from 'src/app/services/variables.service';
import { Message } from 'primeng/api';
import { Subject } from 'rxjs';
import { varsDeleteRequest, varsListRequest, varsRequest, varsTypesRequest, varsUpdateRequest } from 'src/app/interfaces/varsTemplate';

@Component({
  selector: 'app-create-variables',
  templateUrl: './create-variables.component.html',
  styleUrls: ['./create-variables.component.scss']
})
export class CreateVariablesComponent implements OnInit, OnDestroy {
  createVariableForm: FormGroup;
  updateVariableForm: FormGroup;
  dataVariable: any;
  loading = false;
  getVariableData: any;
  getTypesData: any;
  varId: number = 0;
  status: number = 0;

  variableSuccess!: Boolean;
  messagesError: Message[] = [];
  messagesSuccess: Message[] = [];
  success: boolean = false;
  error: string | null = null;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private variablesService: VariablesService
  ) {
    this.createVariableForm = new FormGroup({
      variableName: new FormControl('', [Validators.required]),
      variableText: new FormControl('', [Validators.required]),
      variableType: new FormControl('', [Validators.required]),
    });
    this.updateVariableForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      value: new FormControl('', [Validators.required]),
      types: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getVariable();
    this.getTypes();

    const variableCreateMessage = localStorage.getItem('variableCreateMessage');
    if (variableCreateMessage) {
      this.variableSuccess = true;
      this.messagesSuccess = [
        { severity: 'success', summary: variableCreateMessage }
      ];
      setTimeout(() => {
        this.messagesSuccess = []
      }, 2500);
      localStorage.removeItem('variableCreateMessage');
    };

    const variableUpdateMessage = localStorage.getItem('variableUpdateMessage');
    if (variableUpdateMessage) {
      this.variableSuccess = true;
      this.messagesSuccess = [
        { severity: 'success', summary: variableUpdateMessage}
      ];
      setTimeout(() => {
        this.messagesSuccess = []
      }, 2500);
      localStorage.removeItem('variableUpdateMessage');
    };

    const variableStatusMessage = localStorage.getItem('variableStatusMessage');
    if (variableStatusMessage) {
      this.variableSuccess = true;
      this.messagesSuccess = [
        { severity: 'success', summary: variableStatusMessage}
      ];
      setTimeout(() => {
        this.messagesSuccess = []
      }, 2500);
      localStorage.removeItem('variableStatusMessage');
    };

    const statusErrorMessage = localStorage.getItem('statusErrorMessage');
    if (statusErrorMessage) {
      this.variableSuccess = false;
      this.messagesError = [
        { severity: 'error', summary: statusErrorMessage}
      ];
      setTimeout(() => {
        this.messagesError = []
      }, 2500);
      localStorage.removeItem('statusErrorMessage');
    };

    this.dtOptions = {
      pagingType: 'full_number',
      pageLength: 4,
      lengthMenu: [5, 10, 25],
    };    
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getVariable() {
    const data: varsListRequest = {
      type: 20
    };

    this.variablesService.getListVars(data).subscribe(response => {
      this.getVariableData = response.body;
      this.dtTrigger.next(response);
      console.log(response);
    });
  }

  getTypes() {
    const data: varsTypesRequest = {
      type: 23
    };

    this.variablesService.getVarsType(data).subscribe(response => {
      this.getTypesData = response.body;
      console.log(response);
    });
  }


  createVariable() {
    const data: varsRequest = {
      type: 19,
      params: {
        name: `${this.createVariableForm.value.variableName}`,
        default_value: this.createVariableForm.value.variableText || 'value at the end of the template',
        type_id: this.createVariableForm.value.variableType
      }
    };

    this.variablesService.createVars(data).subscribe(
      response => {
        this.dataVariable = response;
        if (response.statusCode === 200) {
          this.loading = true;
          setTimeout(() => {
            location.reload();
          }, 2000);
          localStorage.setItem('variableCreateMessage', 'Variable Created');          
        } else {
          this.loading = true;
          setTimeout(() => {
            location.reload();
          }, 2000);
          this.variableSuccess = false;
          this.messagesError = [
            { severity: 'error', summary: 'Error', detail: 'Variable Cannot Be Created' }
          ];
        }
        
      });    
  }

  setVarIdStatus(id: number, status: number) {
    this.varId = id;
    this.status = status == 1 ? 0 : 1;
  }

  setTemplateId(id: number) {
    this.varId = id
  }

  updateVariable() {
    const data: varsUpdateRequest = {
      type: 21,
      params: {
        name: `${this.updateVariableForm.value.name}`,
        default_value: this.updateVariableForm.value.value || 'value at the end of the template',
        type_id: parseInt(this.updateVariableForm.value.types),
        var_type_id: this.varId,
      }
    }
    
    this.variablesService.updateVars(data).subscribe(response =>{
      if (response.statusCode === 200) {
        this.loading = true;
        setTimeout(() => {
          location.reload();
        }, 2000);

        localStorage.setItem('variableUpdateMessage', 'Variable Updated');
      } else {
        this.loading = true;
        setTimeout(() => {
          location.reload();
        }, 2000);
        this.variableSuccess = false;
          this.messagesError = [
            { severity: 'error', summary: 'Error', detail: 'Variable Cannot Be Updated' }
          ];
      }    

    });
  }

  deleteVariable() { 
    const data : varsDeleteRequest ={
      type: 22,
      params:{
        var_type_id: this.varId,
        status: this.status
      }
    }    
    this.variablesService.deleteVars(data).subscribe(
      response => {
        console.log(response)
        if (response.statusCode === 200) {
          this.loading = true;
          setTimeout(() => {
            location.reload();
          }, 2000);
          localStorage.setItem('variableStatusMessage', 'Status Updated'); 
        } else {
          this.loading = true;
          setTimeout(() => {
            location.reload();
          }, 2000);
          localStorage.setItem('statusErrorMessage', 'Status Cannot Be Updated'); 
        }
      }); 
    
  }

  resetForm(formulario: FormGroup) {
    formulario.reset();
  }


  variableInput() : void{
    if(this.createVariableForm.value.variableType == 1 ){ 
      this.createVariableForm.get('variableText')?.enable()
      let elemento : any= document.getElementById('inputValue');
      elemento.type="number";
    }else if(this.createVariableForm.value.variableType  == 2 ){
      this.createVariableForm.get('variableText')?.enable()
      let elemento : any= document.getElementById('inputValue');
      elemento.type="text";
    }
    else if(this.createVariableForm.value.variableType  == 3 ){
      let elemento : any= document.getElementById('inputValue');
      elemento.type="date";
      this.createVariableForm.get('variableText')?.enable()
    }
    else if(this.createVariableForm.value.variableType  == 4 ){
      let elemento : any= document.getElementById('inputValue');
      elemento.type="text";
      this.createVariableForm.get('variableText')?.disable()
    }
    else if(this.createVariableForm.value.variableType  == 5 ){
      let elemento : any= document.getElementById('inputValue');
      elemento.type="text";
      this.createVariableForm.get('variableText')?.disable()
    }
    else if(this.createVariableForm.value.variableType  == 6 ){
      let elemento : any= document.getElementById('inputValue');
      elemento.type="text";
      this.createVariableForm.get('variableText')?.disable()
    }
  }

  updateInput() : void{
    if(this.updateVariableForm.value.types == 1 ){ 
      this.updateVariableForm.get('value')?.enable()
      let elemento : any= document.getElementById('updateValue');
      elemento.type="number";
    }else if(this.updateVariableForm.value.types  == 2 ){
      this.updateVariableForm.get('value')?.enable()
      let elemento : any= document.getElementById('updateValue');
      elemento.type="text";
    }
    else if(this.updateVariableForm.value.types  == 3 ){
      let elemento : any= document.getElementById('updateValue');
      elemento.type="date";
      this.updateVariableForm.get('value')?.enable()
    }
    else if(this.updateVariableForm.value.types  == 4 ){
      let elemento : any= document.getElementById('updateValue');
      elemento.type="text";
      this.updateVariableForm.get('value')?.disable()
    }
    else if(this.updateVariableForm.value.types  == 5 ){
      let elemento : any= document.getElementById('updateValue');
      elemento.type="text";
      this.updateVariableForm.get('value')?.disable()
    }
    else if(this.updateVariableForm.value.types  == 6 ){
      let elemento : any= document.getElementById('updateValue');
      elemento.type="text";
      this.updateVariableForm.get('value')?.disable()
    }
  }

}
