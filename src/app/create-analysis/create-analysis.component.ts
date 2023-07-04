import { Component, OnInit } from '@angular/core';
import { createAnalysis } from '../interfaces/varsAnalysis';
import { AnalysisService } from "../services/analysis.service"
import { ControlContainer, FormArray, FormControl, FormGroup, Validators } from "@angular/forms"

@Component({
  selector: 'app-create-analysis',
  templateUrl: './create-analysis.component.html',
  styleUrls: ['./create-analysis.component.scss']
})
export class CreateAnalysisComponent implements OnInit {
  public createAnalysisForm: FormGroup<any> = new FormGroup ({});
  public createAnalysisFormColumn: FormGroup<any> = new FormGroup ({});
  public createAnalysisFormBody: FormGroup<any> = new FormGroup ({});
  constructor(private analysisService: AnalysisService) {

    this.createAnalysisForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      body: new FormArray([
        this.createAnalysisFormBody = new FormGroup({
          var_name: new FormControl("", [Validators.required]),
          var_value: new FormControl("", [Validators.required]),
          body: new FormControl("", [Validators.required]),
        })
       ]),
      column: new FormArray([
       this.createAnalysisFormColumn =  new FormGroup({
          col_name: new FormControl("", [Validators.required]),
          col_value: new FormControl("", [Validators.required]), 
        })
      ])
      
    })
  }

  ngOnInit() {

  }


  onSubmit() {
    const data: createAnalysis = {
      type: 70,
      params: {
        name: this.createAnalysisForm.value.name,
        column: [{
          col_name: this.createAnalysisFormColumn.value.col_name,
          col_value: this.createAnalysisFormColumn.value.col_value
        }],
        body: {
          analysis_1: [{
            var_name: "string",
            var_value: "string",
            body: []
          }],
          analysis_2: [{
            var_name: "string",
            var_value: "string",
            body: []
          }]
        }
      }
    }
    // this.analysisService.postAnalysis(data).subscribe((response: any) => {
    //   console.log(response)
    //   console.log(this.createAnalysisForm)
    // })
  }


addColumn(){
  const column = <FormArray>this.createAnalysisFormColumn.controls['column'];
  column.push(
    new FormGroup({
      col_name:new FormControl(''),
      col_value:new FormControl('')
    })
  )
}

}
