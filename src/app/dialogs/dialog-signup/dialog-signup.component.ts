import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dialog-signup',
  standalone: true,
  imports: [ MatButtonModule, MatDialogActions, MatDialogContent, MatDialogClose, MatDialogTitle, FormsModule],
  templateUrl: './dialog-signup.component.html',
  styleUrl: './dialog-signup.component.scss'
})
export class DialogSignupComponent {

  register() {}

}
