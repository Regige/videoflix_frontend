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

  constructor(private as: AuthService, public dialogRefLogin: MatDialogRef<DialogSignupComponent>, @Inject(MAT_DIALOG_DATA) public data: { email: string }) {}

  ngOnInit() {
    this.email = this.data.email;
  }

  async register(form: NgForm) {
    if(form.valid) {
      try {
        // email muss noch klein geschrrieben werden
        // checken ob beide passworter gleich sind, erst dann weiter!
        let resp: any = await this.as.registerWithEmailAndPassword(this.email, this.password1);
        console.log(resp);

        localStorage.setItem('access_token', resp['access_token']);
        localStorage.setItem('refresh_token', resp['user_data']['tokens']['refresh']);
        this.dialogRefLogin.close();
        
        // this.router.navigateByUrl('/main-page');

      } catch(e) {
        console.error(e);
      }

    }
  }

}
