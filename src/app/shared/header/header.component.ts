import { Component, inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { DialogLoginComponent } from '../../dialogs/dialog-login/dialog-login.component';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { StartService } from '../../services/start.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ MatDialogModule, RouterModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  readonly dialog = inject(MatDialog);
  currentRoute: string = '';


  constructor(private router: Router, public start: StartService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });
  }


  ngOnInit(): void {
    this.currentRoute = this.router.url;
    console.log('currentRoute is: ', this.currentRoute)
  }


  openDialog() {
    this.start.dialogOpen = true;

    const dialogRef = this.dialog.open(DialogLoginComponent, { panelClass: ['dialog-bor-rad'] });

    dialogRef.afterClosed().subscribe(result => {
      this.start.dialogOpen = false;
    });
  }


  logout() {
    
  }


}
