import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service';
import { Router} from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  slide : []; 
  constructor(private dataservice:DataService,private router:Router) { 

    this.getBanner();
  }
 
  ngOnInit(): void {
  }
  getBanner(){
    this.dataservice.getBanner()
    .subscribe((resp:any)=>{
      this.slide=resp[0].thumbUrl
      // console.log( this.slide)
    })
  }

}
