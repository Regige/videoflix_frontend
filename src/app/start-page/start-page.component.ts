import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { DialogSignupComponent } from '../dialogs/dialog-signup/dialog-signup.component';
import { DialogResetPasswordComponent } from '../dialogs/dialog-reset-password/dialog-reset-password.component';
import { StartService } from '../services/start.service';

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [ MatDialogModule, HeaderComponent, FooterComponent ],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.scss'
})
export class StartPageComponent {

  readonly dialog = inject(MatDialog);

  constructor(public start: StartService) {}

  openDialog() {
    this.dialog.open(DialogSignupComponent, { panelClass: ['dialog-bor-rad'] });
    this.start.dialogOpen = true;
  }




  openDialogReset() {
    this.dialog.open(DialogResetPasswordComponent, { panelClass: ['dialog-bor-rad'] });
    this.start.dialogOpen = true;
  }
}
