import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { DataService } from '../services/data.service';

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
        
      this.data.videos = await this.data.loadVideos();
        
        // const rawVideos: any = await this.data.loadVideos();
        
        // this.data.videos = this.mapContacts(rawContacts);

      console.log(this.data.videos);

    } catch(e) {

      console.log(e);
      this.error = 'Fehler beim Laden!';
    }

  }


  // mapContacts(rawContacts: any[]): Contact[] {
  //     return rawContacts.map(contact => ({
  //       id: contact.id,
  //       title: contact.title,
  //       email: contact.email,
  //       phone: contact.phone,
  //       hex_color: contact.hex_color,
  //       logogram: contact.logogram
  //     } as Contact));
  //   }

}
