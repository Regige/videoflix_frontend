import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-signup',
  standalone: true,
  imports: [ MatButtonModule, MatDialogActions, MatDialogContent, MatDialogClose, MatDialogTitle, FormsModule],
  templateUrl: './dialog-signup.component.html',
  styleUrl: './dialog-signup.component.scss'
})
export class DialogSignupComponent {

  email: string = '';
  password1: string = '';
  password2: string = '';
  signUpError: boolean = false;
  formSubmitted: boolean = false;
  hideForm: boolean = false;


  constructor(private as: AuthService, public dialogRefLogin: MatDialogRef<DialogSignupComponent>, @Inject(MAT_DIALOG_DATA) public data: { email: string }, private router: Router) {}


  ngOnInit() {
    this.email = this.data?.email ?? '';
  }


  async register(form: NgForm) {
    if(form.valid) {
      try {
        this.email = this.email.toLowerCase();
        if (this.password1 !== this.password2) {
          return;
        }

        let resp: any = await this.as.registerWithEmailAndPassword(this.email, this.password1);

        this.hideForm = true;
        this.formSubmitted = true;

        localStorage.setItem('access_token', resp['access_token']);
        localStorage.setItem('refresh_token', resp['user_data']['tokens']['refresh']);

        setTimeout(() => {
          this.dialogRefLogin.close();
          }, 10000);

      } catch(e) {
        console.error('An error occurred during registration.');
        this.hideForm = true;
        this.signUpError = true;
        setTimeout(() => {
          window.location.reload();
        }, 10000);
      }
    }
  }



}
