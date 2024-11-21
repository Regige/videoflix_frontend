import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';

@Component({
  selector: 'app-dialog-forgot-password',
  standalone: true,
  imports: [FormsModule, SpinnerComponent],
  templateUrl: './dialog-forgot-password.component.html',
  styleUrl: './dialog-forgot-password.component.scss'
})
export class DialogForgotPasswordComponent {

  email: string = '';
  emailSubmitted: boolean = false;
  ForgotPasswordError: boolean = false;
  loadingForgotten = false;

  
  constructor(private as: AuthService) {}


  async sendEmailForPasswordReset(form: NgForm) {
    if(form.valid) {
      try {
        this.loadingForgotten = true;
        let resp: any = await this.as.getResetPasswordLink(this.email);
        // console.log(resp);
        this.emailSubmitted = true;

      } catch(e) {
        console.error('Something went wrong!');
        this.ForgotPasswordError = true;
        this.loadingForgotten = false;
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      }
    }
  }

}
