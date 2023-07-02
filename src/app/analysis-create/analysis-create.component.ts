import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { varsListRequest } from '../interfaces/varsTemplate';
import { VariablesService } from '../services/variables.service';

@Component({
  selector: 'app-analysis-create',
  templateUrl: './analysis-create.component.html',
  styleUrls: ['./analysis-create.component.scss']
})
export class AnalysisCreateComponent {

  public rowsForm!: FormGroup;
  public rows: any[] = []; 
  public rows2: any[] = []; 
  public optionsList: string[] = [ 'Address', 'Sale Price', 'Prueba 1', 'Prueba 2' ]
  public getVariableData!: any;

  constructor(private formBuilder: FormBuilder, private variablesService: VariablesService) {
    this.rowsForm = this.formBuilder.group({
      variable: [''],
      value: [''],
      displayName: [''],
      adjusting: [''],
      bold: [''],
      underline: [''],
      fontType: [''],
    });

    this.getVariable()
    this.addRow();
  }

  addRow(afterRow?: any) {
    if (this.rowsForm.valid) {
      const newRow = { ...this.rowsForm.value };
  
      if (afterRow) {
        const index = this.rows.indexOf(afterRow);
        this.rows.splice(index + 1, 0, { ...newRow });
        this.rows2.splice(index + 1, 0, { ...newRow });
      } else {
        this.rows.push({ ...newRow });
        this.rows2.push({ ...newRow });
      }
  
      this.rowsForm.reset();
    }
  }

  removeRow(row: any) {
    const rowIndex = this.rows.indexOf(row);
    if (rowIndex !== -1) {
      this.rows.splice(rowIndex, 1);
    }
  }

  getVariable() {
    const data: varsListRequest = {
      type: 20
    };

    this.variablesService.getListVars(data).subscribe(response => {
      this.getVariableData = response.body;
    });
  }

  updateVariableValue(row: any, newValue: string, arrayChange: 'rows' | 'rows2') {
    console.log(row)
    const rowIndex = row;
    console.log(rowIndex);
    
    if (rowIndex !== -1) {
      this[arrayChange][rowIndex].variable = newValue;
    }
  }
  
}
