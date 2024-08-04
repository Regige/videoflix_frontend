import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DialogSignupComponent } from '../dialogs/dialog-signup/dialog-signup.component';

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, MatDialogModule, MatButtonModule],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.scss'
})
export class StartPageComponent {

  readonly dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(DialogSignupComponent);
  }

}
