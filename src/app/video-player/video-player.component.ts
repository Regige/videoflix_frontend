import { Component } from '@angular/core';
import { SpeedService } from '../services/speed.service';
import { DataService } from '../services/data.service';
import { HeaderComponent } from '../shared/header/header.component';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss'
})
export class VideoPlayerComponent {

  videoUrl: string = '';

  constructor(private speedS: SpeedService, public data: DataService) {}

  async ngOnInit() {
    // const speed = await this.speedS.measureSpeed();
    // this.videoUrl = this.speedS.selectVideoUrl(speed, this.videoInstance); 
    // Video Objekt = this.videoInstance
  }

}
