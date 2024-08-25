import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { DialogSignupComponent } from '../dialogs/dialog-signup/dialog-signup.component';
import { StartService } from '../services/start.service';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [ MatDialogModule, HeaderComponent, FooterComponent, FormsModule ],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.scss'
})
export class StartPageComponent {
  email: string = '';

  readonly dialog = inject(MatDialog);

  constructor(public start: StartService, private as: AuthService) {}


  openSignUp(form: NgForm) {
    
    if(form.valid) {
      this.as.removeTokenFromStorage();
      this.start.dialogOpen = true;
  
      const dialogRef = this.dialog.open(DialogSignupComponent, { panelClass: ['dialog-bor-rad'], data: { email: form.value.email } }, );
  
      dialogRef.afterClosed().subscribe(result => {
        this.start.dialogOpen = false;
      });
    }
  }

}
