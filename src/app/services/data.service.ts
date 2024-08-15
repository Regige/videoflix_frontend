import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // thumbnails = []; //: thumbnail[]
  videos:any = [];
  // selectedVideo = [];
  // urlThumbnails = environment.baseUrl + '/videos/thumbnails/';
  urlVideo = environment.baseUrl + '/videos/all/';
  
  constructor(private http: HttpClient) { }


  // loadThumbnails() {

  //   return lastValueFrom(this.http.get(this.urlThumbnails));
  // }


  loadVideos() {
    return lastValueFrom(this.http.get(this.urlVideo));
  }
}
