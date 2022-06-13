import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  readonly BaseURI = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  addImage(val: FormData) {
    return this.http.post(this.BaseURI + '/file', val);
  }

  addUrl(val: any) {
    return this.http.post(this.BaseURI + '/remote', val);
  }

  findMatches(val: any) {
    return this.http.get(this.BaseURI + '/find/' + val);
  }

  getMyImages() {
    return this.http.get(this.BaseURI + '/user/image');
  }
}
