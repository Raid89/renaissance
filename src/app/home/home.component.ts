import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions} from "chart.js";
import { DocumentsService } from '../services/documents.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  templeatesCreated:any;
  getPublished: any;
  getPerDay!:any;
  getPerCount:any;
  dtOptions: DataTables.Settings= {};
  dtTrigger:Subject<any> = new Subject();

  constructor(
    private documentsService: DocumentsService
  ){}


  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: []
  };
  
  
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    elements: {
      line: {
        borderDash: [10, 5]
      }
    },
  };
  
  
  public lineChartLegend = false;

  //Aquí empieza el código

  ngOnInit(): void {
    this.getDocuments();
    this.getDocumentsDay();
    this.getTemplatesCreated();

    this.dtOptions = {
      pagingType: 'full_number',
      pageLength: 4,
      lengthMenu : [5, 10, 25],
    };
  } 

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }



  getDocuments() {
    const data = {
      type: 40
    }
    this.documentsService.getDocuments(data).subscribe(response =>{
      if(response.statusCode === 200){
        this.getPublished = response.body;
        this.dtTrigger.next(response);              
      }else{
        console.log(response);        
      }
    })
  }

  getDocumentsDay() {
    const data = {
      type: 41
    };
    this.documentsService.getDocumentsDay(data).subscribe(response => {
      if (response.statusCode === 200) {
        const chartData = response.body.map((data: any) => ({
          day: data.day,
          count: data.count
        }));
  
        this.lineChartData = {
          labels: chartData.map((data: any) => data.day),
          datasets: [
            {
              data: chartData.map((data: any) => data.count),
              fill: true,
              tension: 0,
              borderColor: 'rgb(30, 67, 152)',
              backgroundColor: 'transparent'
            }
          ]
        };
      } else {
        console.log(response);
      }
    });
  }
  
getTemplatesCreated() {
    const data = {
      type: 30
    };
    this.documentsService.getTemplatesCreated(data).subscribe(response => {
      if (response.statusCode === 200) {
        this.templeatesCreated = response.body[0].no_templates_created
      } else {
        this.templeatesCreated = 0
      }
    });
  }
  


}
