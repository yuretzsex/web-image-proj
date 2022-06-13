import { Component, OnInit } from '@angular/core';
import { ImageService } from '../shared/image.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {

  constructor(private service: ImageService) { }

  arr: any;

  ngOnInit(): void {
    this.service.getMyImages().subscribe(res => {console.log(res); this.arr = res;});
    
  }

}
