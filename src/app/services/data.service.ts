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

  videos:any = [];
  selVideo: Video = {
        id: -1,
        title: 'Breakout',
        description: this.lorem_ipsum,
        created_at: '',
        category: '',
        is_new: true,
        thumbnail: 'assets/img/wale.jpeg',
        thumbnail_bg: 'assets/img/wale.jpeg',
        video_file: ''
  };

  urlVideo = environment.baseUrl + '/videos/all/';


  constructor(private http: HttpClient) { }



// Get Videos

loadVideos() {
    return lastValueFrom(this.http.get(this.urlVideo));
  }


  checkForSelVideo() {
    const videoJson = localStorage.getItem('selected_video');

    if (videoJson) {
      const savedVideo: Video = JSON.parse(videoJson);

      this.selVideo = savedVideo;
    }
  }


}


