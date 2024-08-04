import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-signup',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogContent, MatDialogClose],
  templateUrl: './dialog-signup.component.html',
  styleUrl: './dialog-signup.component.scss'
})
export class DialogSignupComponent {

}
