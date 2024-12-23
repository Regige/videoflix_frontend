import { Component, ViewChild, ElementRef } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { DataService } from '../services/data.service';
import { Video } from '../interfaces/video';
import { environment } from '../../environments/environment.development';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from "../shared/spinner/spinner.component";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [HeaderComponent, RouterModule, CommonModule, SpinnerComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

  errorData = false;
  dramaVideos: Video[] = [];
  romanceVideos: Video[] = [];
  documentaryVideos: Video[] = [];
  isDesktopScreen: boolean = true;
  loadData: boolean = false;

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;


  constructor(public data: DataService, private router: Router) {}


  async ngOnInit() {
    this.isDesktopScreen = window.innerWidth > 592;
    try {
      const rawVideos: any = await this.data.loadVideos();
        
      this.data.videos = this.mapVideos(rawVideos);
      this.sortVideos();

      // console.log(this.data.videos);

      this.data.checkForSelVideo();
      if(this.data.selVideo.id === -1) {
        this.data.selVideo = this.data.videos.find((video: Video) => video.is_new === true) || this.data.videos[0];
      }
      this.loadData = true;

    } catch(e) {
      // console.log(e);
      this.errorData = true;
      this.loadData = true;

      setTimeout(() => {
        this.router.navigateByUrl('');
      }, 4000);

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
        thumbnail_bg: environment.baseUrl + video.thumbnail_bg,
        video_file: environment.baseUrl + video.video_file
      } as Video));
  }


  selVideoElement(video: Video) {
    this.data.selVideo = video;

    const videoJson = JSON.stringify(video);
    sessionStorage.setItem('selected_video',videoJson);

    if(window.innerWidth <= 592) {
      this.router.navigateByUrl('/main-page-preview');
    }
  }


  playVideo(): void {
    const videoElement = document.getElementById('videoPlayer') as HTMLVideoElement;

    if (videoElement) {
      videoElement.src = this.data.selVideo.video_file;
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

