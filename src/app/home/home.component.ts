import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service';
import { Router} from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  slide ; 
  token;
  songs;
  songVideos:[];
  movies;
  movieVideos:[];
  documentary;
  videos:[];
  constructor(private dataservice:DataService,private router:Router) { 
    this.token= JSON.parse(localStorage.getItem('token'));

 console.log("from constructor "+this.token)
    
  }
 
  ngOnInit(): void {
    this.getBanner(this.token);
this.getHomeVideos(this.token);
  }
  getBanner(tokenValue){
     this.dataservice.getBanner(tokenValue)
    .subscribe((resp:any)=>{
      this.slide=resp[0].thumbUrl
      // console.log( this.slide)
    })
  }
  getHomeVideos(tokenValue){
    this.dataservice.getHomeVideos(tokenValue)
    .subscribe((resp:any)=>{
this.songs=resp[0].category
console.log("category is " +this.songs);
this.songVideos=resp[0].videos;
console.log(this.songVideos)
this.movies=resp[1].category;
this.movieVideos=resp[1].videos;

    })
  }
}
