import { Component, ViewChild } from '@angular/core';
import { SpeedService } from '../services/speed.service';
import { DataService } from '../services/data.service';
import { HeaderComponent } from '../shared/header/header.component';
// import { BrowserModule } from '@angular/platform-browser';
import {VgCoreModule, VgMediaDirective} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [HeaderComponent, VgCoreModule, VgControlsModule, VgOverlayPlayModule, VgBufferingModule],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss'
})
export class VideoPlayerComponent {
  
  isFullscreen: boolean = false;
  isMuted: boolean = false;
  isMobile: boolean = false;
  

  constructor(private speedS: SpeedService, public data: DataService) {}
  

  async ngOnInit() {
    this.checkScreenWidth();

    this.data.checkForSelVideo();

    await this.selFile();

    setTimeout(() => {
      let header = document.getElementById('video-player-header');
      if(header) {
        header.classList.add('hidden');
      }
    }, 4000);
  }


  

  toggleScreen() {
    let fullscreenElement = document.getElementById('vg-fullscreen');

    if(fullscreenElement) {
      this.isFullscreen = !this.isFullscreen; 

      if(this.isFullscreen === true) {
        fullscreenElement.style.backgroundImage = "url('./../../assets/img/icon/compress_white.svg')";
      } else {
        fullscreenElement.style.backgroundImage = "url('./../../assets/img/icon/expand_white.svg')"
      }
    }
  }

  toggleSound() {
    let soundElement = document.getElementById('vg-mute');

    if(soundElement) {
      this.isMuted = !this.isMuted; 

      if(this.isMuted === true) {
        soundElement.style.backgroundImage = "url('./../../assets/img/icon/silenc.svg')";
      } else {
        soundElement.style.backgroundImage = "url('./../../assets/img/icon/loud.svg')"
      }
    }
  }

  checkScreenWidth(): void {
    this.isMobile = window.innerWidth < 640;
  }


  showHeader() {
    let header = document.getElementById('video-player-header');
    if(header) {
      header.classList.remove('hidden');
    }
  }

  hideHeader() {
    let header = document.getElementById('video-player-header');
    if(header) {
      header.classList.add('hidden');
    }
  }


  async selFile() {
    const speed = await this.speedS.measureSpeed();
    const videoUrl = this.speedS.selectVideoUrl(speed, this.data.selVideo); 
    this.data.selVideo.video_file = videoUrl;
    console.log('So sieht die file aus: ', videoUrl);
  }
}
