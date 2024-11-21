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
import { SpinnerComponent } from '../../shared/spinner/spinner.component';

@Component({
  selector: 'app-dialog-login',
  standalone: true,
  imports: [ MatButtonModule, MatDialogActions, MatDialogContent, MatDialogClose, MatDialogTitle, FormsModule, MatDialogModule, SpinnerComponent],
  templateUrl: './dialog-login.component.html',
  styleUrl: './dialog-login.component.scss'
})
export class DialogLoginComponent {

  email: string = '';
  password: string = '';
  remember: boolean = false;
  loginError = false;
  loadingLogin = false;
  savedInLocalStorage = false;


  readonly dialog = inject(MatDialog);


  constructor(public start: StartService, public dialogRefLogin: MatDialogRef<DialogLoginComponent>, private as: AuthService, private router: Router) {}

  ngOnInit() {
    console.log('Vor dem Lesen aus localStorage:');
    console.log('Email:', localStorage.getItem('email'));
    console.log('Access Token:', localStorage.getItem('access_token'));
    console.log('Refresh Token:', localStorage.getItem('refresh_token'));

    const savedEmail = localStorage.getItem('email');
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    if (savedEmail && accessToken && refreshToken) {
      this.email = savedEmail; 
      this.password = '********'; 
      this.remember = true; 
      this.savedInLocalStorage = true;
    }
  }



  async login(form: NgForm) {
    if(form.valid && !this.savedInLocalStorage) {
      try {
        this.loadingLogin = true;
        this.email = this.email.toLowerCase();

        let resp: any = await this.as.loginWithEmailAndPassword(this.email, this.password);

        if (this.remember) {
          localStorage.setItem('email', this.email);
          localStorage.setItem('access_token', resp['access']);
          localStorage.setItem('refresh_token', resp['refresh']);
        } else {
          sessionStorage.setItem('access_token', resp['access']);
          sessionStorage.setItem('refresh_token', resp['refresh']);
        }

        this.dialogRefLogin.close();
        this.router.navigateByUrl('/main-page');

      } catch(e) {
        console.error("Login ist fehlgeschlagen");
        this.loadingLogin = false;
        this.loginError = true;
      }
    } else if(form.valid && this.savedInLocalStorage) {
        this.dialogRefLogin.close();
        this.router.navigateByUrl('/main-page');
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


  onRememberChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    
    if (!checkbox.checked) {
      this.as.removeTokenFromlocalStorage();

      this.email = '';
      this.password = '';
      this.savedInLocalStorage = false;
      this.remember = false;
    }
}


}
