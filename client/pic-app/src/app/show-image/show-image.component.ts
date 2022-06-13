import { Component, OnInit } from '@angular/core';
import { ImageService } from '../shared/image.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-show-image',
  templateUrl: './show-image.component.html',
  styles: [
    `.modal-body {
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      align-items: center;
    }`
  ]
})
export class ShowImageComponent implements OnInit {

  title: string = "";

  result: any = null;

  constructor(public service: ImageService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  searchImage(): void {
    console.log(this.title);
    var res = this.service.findMatches(this.title)
      .subscribe(res => {
        console.log(res);
        this.result = res;
      },
        error => {
          this.toastr.error("Cant upload file", "Error");
        }
      );

  }

}
