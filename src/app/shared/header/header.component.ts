import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogSignupComponent } from '../../dialogs/dialog-signup/dialog-signup.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  readonly dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(DialogSignupComponent);
  }

}
