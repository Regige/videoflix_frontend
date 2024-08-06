import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-dialog-forgot-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dialog-forgot-password.component.html',
  styleUrl: './dialog-forgot-password.component.scss'
})
export class DialogForgotPasswordComponent {

  email: string = '';

  sendEmailForPassword(form: NgForm) {
    if(form.valid) {
      
    }

  }
}
