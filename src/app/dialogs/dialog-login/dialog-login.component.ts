import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogSignupComponent } from '../dialog-signup/dialog-signup.component';
import { DialogForgotPasswordComponent } from '../dialog-forgot-password/dialog-forgot-password.component';
import { StartService } from '../../services/start.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dialog-login',
  standalone: true,
  imports: [ MatButtonModule, MatDialogActions, MatDialogContent, MatDialogClose, MatDialogTitle, FormsModule, MatDialogModule],
  templateUrl: './dialog-login.component.html',
  styleUrl: './dialog-login.component.scss'
})
export class DialogLoginComponent {

  email: string = '';
  password: string = '';

  readonly dialog = inject(MatDialog);


  constructor(public start: StartService, public dialogRefLogin: MatDialogRef<DialogLoginComponent>, private as: AuthService, private router: Router) {}

  async login(form: NgForm) {
    if(form.valid) {
      try {
        // email muss noch klein geschrrieben werden
        let resp: any = await this.as.loginWithEmailAndPassword(this.email, this.password);
        console.log(resp);

        localStorage.setItem('access_token', resp['access']);
        localStorage.setItem('refresh_token', resp['refresh']);
        this.dialogRefLogin.close();
        
        this.router.navigateByUrl('/main-page');

      } catch(e) {
        console.error(e);
      }
    }
  }



  openDialog(dialog: string) {
    this.dialogRefLogin.close();
    this.dialogRefLogin.afterClosed().subscribe(() => {
      this.start.dialogOpen = true;
      if(dialog === 'forgotPassword') {
        const dialogRef = this.dialog.open(DialogForgotPasswordComponent, { panelClass: ['dialog-bor-rad'] });

        dialogRef.afterClosed().subscribe(result => {
        this.start.dialogOpen = false;
      });

      } else if(dialog === 'signUp') {
        const dialogRef = this.dialog.open(DialogSignupComponent, { panelClass: ['dialog-bor-rad'] });

        dialogRef.afterClosed().subscribe(result => {
        this.start.dialogOpen = false;
      });

      }
    });
  }


}
