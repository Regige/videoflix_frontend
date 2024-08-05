import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { DialogSignupComponent } from '../dialog-signup/dialog-signup.component';
import { DialogForgotPasswordComponent } from '../dialog-forgot-password/dialog-forgot-password.component';

@Component({
  selector: 'app-dialog-login',
  standalone: true,
  imports: [ MatButtonModule, MatDialogActions, MatDialogContent, MatDialogClose, MatDialogTitle, FormsModule, MatDialogModule],
  templateUrl: './dialog-login.component.html',
  styleUrl: './dialog-login.component.scss'
})
export class DialogLoginComponent {
  readonly dialog = inject(MatDialog);

  login() {

  }

// am besten im parent Element ausführen!
  openDialog(dialog: string) {
    if(dialog === 'forgotPassword') {
      this.dialog.open(DialogForgotPasswordComponent, { panelClass: ['dialog-bor-rad'] });
    } else if(dialog === 'signUp') {
      this.dialog.open(DialogSignupComponent, { panelClass: ['dialog-bor-rad'] });
    }
  }

}
