import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-post',
  templateUrl: './image-post.component.html',
  styles: [
    'img {width: 500px; height: 500px; margin-bottom: 20px;}'
  ]
})
export class ImagePostComponent implements OnInit {

  @Input() postObj: any = null;

  constructor() { }

  ngOnInit(): void {
  }

}
