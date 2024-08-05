import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dialog-forgot-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dialog-forgot-password.component.html',
  styleUrl: './dialog-forgot-password.component.scss'
})
export class DialogForgotPasswordComponent {


  sendEmailForPassword() {

  }
}
