import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { varsListRequest } from '../interfaces/varsTemplate';
import { VariablesService } from '../services/variables.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogNewItem } from './components/dialog-new-item/dialog-new-item';
import { IAnalysis, IColumn, ICreateAnalysis } from '../interfaces/varsAnalysis';
import { ComparableService } from '../services/comparable.service';
import { AnalysisService } from '../services/analysis.service';

@Component({
  selector: 'app-analysis-create',
  templateUrl: './analysis-create.component.html',
  styleUrls: ['./analysis-create.component.scss']
})
export class AnalysisCreateComponent implements OnInit {

  public rowsForm!: FormGroup;
  public rows: any[] = [];
  public rows2: any[] = [];
  public newColumns: string[] = [];
  public additionalColumns: string[] = [];
  public rowsList: string[] = ['Variable name', 'Value', 'Display name', 'Adjusting', 'Actions']
  public getVariableData!: any;
  public comparablesData!: any;
  public comparableSelected!: string;

  constructor
    (
      private formBuilder: FormBuilder,
      private variablesService: VariablesService,
      public dialog: MatDialog,
      private comparableService: ComparableService,
      private analysisService: AnalysisService
    ) {
    this.rowsForm = this.formBuilder.group({
      variable: [''],
      value: [''],
      displayName: [''],
      adjusting: [''],
      bold: [''],
      underline: [''],
      fontType: [''],
    });
    this.addRow();
  }

  ngOnInit(): void {
    this.getVariable()
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
      this.rows2.splice(rowIndex, 1);
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

  searchComparable(nameComparable: string) {
    const data = {
      type: 51,
      params: {
        name: nameComparable
      }
    };

    this.comparableService.searchComparable(data).subscribe((response: any) => {
      this.comparablesData = response.body
    });
  }

  selectComparable(comparable: any){
    this.rows = []
    this.rows2 = []
    comparable.body.forEach((element: any, index: number) => {
      this.addRow()
      this.rows[index].variable = element.name
      this.rows[index].value = element.value
      this.rows2[index].variable = element.name
      this.rows2[index].value = element.value
    })
    this.comparableSelected = comparable.name
  }

  updateVariableValue(row: any, newValue: string, arrayChange: 'rows' | 'rows2') {
    console.log(row)
    const rowIndex = row;
    console.log(rowIndex);

    if (rowIndex !== -1) {
      this[arrayChange][rowIndex].variable = newValue;
    }
  }

  abrirDialogo(afterRow?: any) {
    const dialogRef = this.dialog.open(DialogNewItem, {
      width: '250px',
      panelClass: 'center-dialog',
      data: {action: 'new'}
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado.type === 'row') this.addRow(afterRow)

      if (resultado.type === 'column') {
        this.newColumns.push(resultado.name)
        const newColumnName = resultado.name;
        this.additionalColumns.push(newColumnName);
        for (let i = 0; i < this.rows.length; i++) {
          this.rows[i][newColumnName] = '';
        }
      }
    });
  }

  getDataColumns(): IColumn[] {
    const data: IColumn[] = []
    this.rows.forEach(element => {
      Object.keys(element).forEach(propiedad => {
        const column: IColumn = {
          col_name: propiedad,
          col_value: element[propiedad]
        }
        data.push(column)
      });
    });

    return data
  }

  getAnalysis1(): IAnalysis[] {
    const transformedDataArray: IAnalysis[] = [];
    this.rows.forEach(data => {
      const transformedData: IAnalysis = {
        var_name: data.variable,
        var_value: data.value,
        body: []
      };
  
      for (let key in data) {
        if (key !== 'variable' && key !== 'value') {
          transformedData.body.push(data[key as keyof typeof data] as string);
        }
      }
  
      transformedDataArray.push(transformedData);
    });
  
    return transformedDataArray;
  }

  getAnalysis2(): IAnalysis[]{
    const transformedDataArray: IAnalysis[] = [];
    this.rows2.forEach(data => {
      const transformedData: IAnalysis = {
        var_name: data.variable,
        var_value: data.value,
        body: []
      };
  
      for (let key in data) {
        if (key !== 'variable' && key !== 'value' ) {
          transformedData.body.push(data[key as keyof typeof data] as string);
        }
      }
  
      transformedDataArray.push(transformedData);
    });
  
    return transformedDataArray;
  }

  sendForm(){

    const columns = this.getDataColumns()
    const analysis_1 = this.getAnalysis1()
    const analysis_2 = this.getAnalysis2()

    const dialogRef = this.dialog.open(DialogNewItem, {
      width: '250px',
      panelClass: 'center-dialog',
      data: { action: 'save' }
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      console.log('Dato guardado:', resultado);
      const data: ICreateAnalysis = {
        type: 70,
        params: {
          name: resultado.name,
          column: columns,
        },
        body: {
          analysis_1: analysis_1,
          analysis_2: analysis_2
        }
      }
      console.log(data);
      
      this.analysisService.postAnalysis(data).subscribe((response: any) => {
        console.log(response)
      })
    });
  }
    
}
