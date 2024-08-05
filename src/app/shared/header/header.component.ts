import { Component, inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { DialogLoginComponent } from '../../dialogs/dialog-login/dialog-login.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ MatDialogModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  readonly dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(DialogLoginComponent, { panelClass: ['dialog-bor-rad'] });
  }

}
