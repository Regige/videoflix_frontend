import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { lastValueFrom } from 'rxjs';
import { Video } from '../interfaces/video';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  lorem_ipsum = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi quaerat ipsa et quisquam culpa, fugit dignissimos quis voluptate officiis dolor enim repudiandae molestiae, autem impedit molestias iste repellat! Eius esse!"
  
  // thumbnails = []; //: thumbnail[]
  videos:any = [];
  selVideo: Video = {
        id: -1,
        title: 'Breakout',
        description: this.lorem_ipsum,
        created_at: '',
        category: '',
        is_new: true,
        thumbnail: 'assets/img/wale.jpeg',
        video_file: ''
  };

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
