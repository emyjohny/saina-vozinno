import { Component, OnInit ,Input, SimpleChanges} from '@angular/core';
import { DataService } from '../services/data.service';
import videojs from 'video.js';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
@Input() id:string;
@Input() movieVideos:any[];

details:[];
cast:[];
test=["http://placehold.it/900/f44336/000000&text=First+Slide","http://placehold.it/900/f44336/000000&text=First+Slide","http://placehold.it/900/f44336/000000&text=First+Slide","http://placehold.it/900/f44336/000000&text=First+Slide"]
  constructor(private dataservice:DataService) {
    
   }

  ngOnInit(): void {
   
     }

  ngOnChanges(changes: SimpleChanges){
    
    if(this.id){
    console.log(this.id)
    console.log("list of movies "+ this.movieVideos)
    this.dataservice.getDetails(this.id)
    .subscribe((resp:any)=>{
      console.log(resp)
    this.details=resp.data[0];
    this.cast=resp.data['castCrew']
    
    
    })}
    
}


}