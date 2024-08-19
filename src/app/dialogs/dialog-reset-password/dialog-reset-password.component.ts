import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-dialog-reset-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dialog-reset-password.component.html',
  styleUrl: './dialog-reset-password.component.scss'
})
export class DialogResetPasswordComponent {

  password1: string = '';
  password2: string = '';

  resetPassword(form: NgForm) {
    if(form.valid) {

    }

  }
}
