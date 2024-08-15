import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { DataService } from '../services/data.service';
import { Video } from '../interfaces/video';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

  error = '';

  constructor(public data: DataService) {}

  async ngOnInit() {
    try {
        
      // this.data.videos = await this.data.loadVideos();
        
      const rawVideos: any = await this.data.loadVideos();
        
      this.data.videos = this.mapVideos(rawVideos);

      console.log(this.data.videos);

    } catch(e) {

      console.log(e);
      this.error = 'Fehler beim Laden!';
    }
  }


  mapVideos(rawVideos: any[]): Video[] {
      return rawVideos.map(video => ({
        id: video.id,
        title: video.title,
        description: video.description,
        created_at: video.created_at,
        category: video.category,
        thumbnail: environment.baseUrl + video.thumbnail,
        video_file: environment.baseUrl + video.video_file
      } as Video));
  }



  startVideo(id: number): void {
    const videoElement = document.getElementById('videoPlayer_' + id) as HTMLVideoElement;

    if (videoElement) {
      videoElement.hidden = false;
      videoElement.play();
      if (videoElement.requestFullscreen) {
        videoElement.requestFullscreen();
      } 
      // else if (videoElement.mozRequestFullScreen) { /* Firefox */
      //   videoElement.mozRequestFullScreen();
      // } else if (videoElement.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
      //   videoElement.webkitRequestFullscreen();
      // } else if (videoElement.msRequestFullscreen) { /* IE/Edge */
      //   videoElement.msRequestFullscreen();
      // }
    }
  }

}

