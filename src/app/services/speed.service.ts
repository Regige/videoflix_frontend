import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeedService {

  constructor() { }

  async measureSpeed(): Promise<number> {
    const testUrl = 'assets/speedtest.jpg';  // Pfad zur Datei im assets-Verzeichnis
    const startTime = new Date().getTime();
    
    const response = await fetch(testUrl);
    const endTime = new Date().getTime();
    const duration = (endTime - startTime) / 1000; // in Sekunden
    const fileSize = parseInt(response.headers.get('content-length') || '0', 10); // Konvertiert den Wert zu einer Zahl
    const speedMbps = (fileSize / duration) / (1024 * 1024 * 8); // Mbps
    
    return speedMbps;
  }
  
  selectVideoUrl(speed: number, video: any): string {
    if (speed > 5) {
      return video.video_file_1080p;
    } else if (speed > 1) {
      return video.video_file_720p;
    } else {
      return video.video_file_360p;
    }
  }

  
}
