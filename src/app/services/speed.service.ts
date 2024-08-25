import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeedService {

  constructor() { }

  async measureSpeed(): Promise<number> {
    const testUrl = 'assets/img/speed.jpg';
    const startTime = new Date().getTime();
    
    const response = await fetch(testUrl);
    const endTime = new Date().getTime();
    const duration = (endTime - startTime) / 1000; // in Sekunden
    const fileSize = parseInt(response.headers.get('content-length') || '0', 10);
    const speedMbps = (fileSize / duration) / (1024 * 1024 * 8); // Mbps
    
    return speedMbps;
  }
  
  selectVideoUrl(speed: number, video: any): string {
    let videoFile = video.video_file.slice(0, -4);
    if (speed > 5) {
      return videoFile + '_1080p.mp4';
    } else if (speed > 1) {
      return videoFile + '_720p.mp4';
    } else {
      return videoFile + '_480p.mp4';
    }
  }

  
}
