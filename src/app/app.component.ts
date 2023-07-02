import { Component,OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { PrimeNGConfig } from 'primeng/api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'portal';

  constructor(private loginService:LoginService,private primengConfig: PrimeNGConfig)
  {
        this.loginService.checkTokenExpiration()  
  }

  ngOnInit(){
    this.primengConfig.ripple = true;
    
  }
}
