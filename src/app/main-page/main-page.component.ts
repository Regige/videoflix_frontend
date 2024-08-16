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

  lorem_ipsum = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi quaerat ipsa et quisquam culpa, fugit dignissimos quis voluptate officiis dolor enim repudiandae molestiae, autem impedit molestias iste repellat! Eius esse!"

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
  error = '';
  dramaVideos: Video[] = [];
  romanceVideos: Video[] = [];
  documentaryVideos: Video[] = [];


  constructor(public data: DataService) {}


  async ngOnInit() {
    try {
      const rawVideos: any = await this.data.loadVideos();
        
      this.data.videos = this.mapVideos(rawVideos);
      this.sortVideos();

      console.log(this.data.videos);
      console.log(this.dramaVideos);
      console.log(this.romanceVideos);
      console.log(this.documentaryVideos);

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
        is_new: video.is_new,
        thumbnail: environment.baseUrl + video.thumbnail,
        video_file: environment.baseUrl + video.video_file
      } as Video));
  }


  selVideoElement(video: Video) {
    this.selVideo = video;
  }


  playVideo(): void {
    const videoElement = document.getElementById('videoPlayer') as HTMLVideoElement;

    if (videoElement) {
      videoElement.src = this.selVideo.video_file;
      videoElement.hidden = false;
      videoElement.play();
    
    const requestFullscreen = videoElement.requestFullscreen 
      || (videoElement as any).mozRequestFullScreen 
      || (videoElement as any).webkitRequestFullscreen 
      || (videoElement as any).msRequestFullscreen;

      if (requestFullscreen) {
        requestFullscreen.call(videoElement);
      
      document.addEventListener('fullscreenchange', () => this.onFullScreenChange(videoElement));
      document.addEventListener('webkitfullscreenchange', () => this.onFullScreenChange(videoElement));
      document.addEventListener('mozfullscreenchange', () => this.onFullScreenChange(videoElement));
      document.addEventListener('MSFullscreenChange', () => this.onFullScreenChange(videoElement));
      }
    }
  }


  onFullScreenChange(videoElement: HTMLVideoElement): void {
    const fullscreenElement = document.fullscreenElement 
      || (document as any).webkitFullscreenElement 
      || (document as any).mozFullScreenElement 
      || (document as any).msFullscreenElement;

    if (!fullscreenElement) {
      videoElement.hidden = true;
      videoElement.pause();
    }
  }


  sortVideos(): void {
    // Initialisiere Arrays für jede Kategorie
    this.dramaVideos = [];
    this.romanceVideos = [];
    this.documentaryVideos = [];

    // Kategorisiere Videos nach ihrem Genre
    this.data.videos.forEach((video: Video) => {
      switch (video.category) {
        case 'Drama':
          this.dramaVideos.push(video);
          break;
        case 'Romance':
          this.romanceVideos.push(video);
          break;
        case 'Documentary':
          this.documentaryVideos.push(video);
          break;
        default:
          console.warn(`Unbekannte Kategorie für Video ID ${video.id}: ${video.category}`);
      }
    });
  }
  
}

