import { Component, OnInit ,Input, SimpleChanges} from '@angular/core';
import { DataService } from '../services/data.service';
// import { videojs} from 'video.js'

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
@Input() id:string;

details:[];
cast:[];
player;

  constructor(private dataservice:DataService) { }

  ngOnInit(): void {
    
     }

  ngOnChanges(changes: SimpleChanges){
    
    if(this.id){
    
      console.log(this.id)
    this.dataservice.getDetails(this.id)
    .subscribe((resp:any)=>{
      console.log(resp)
    this.details=resp.data[0];
    this.cast=resp.data['castCrew']
    
    })}
}
playVideo(){
  this.player = (document.getElementById('hls-example'));
  
}

}