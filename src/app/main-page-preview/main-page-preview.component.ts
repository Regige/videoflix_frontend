import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';

@Component({
  selector: 'app-main-page-preview',
  standalone: true,
  imports: [RouterModule, HeaderComponent],
  templateUrl: './main-page-preview.component.html',
  styleUrl: './main-page-preview.component.scss'
})
export class MainPagePreviewComponent {

  constructor(public data: DataService) {

  }

}
