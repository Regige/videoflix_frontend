import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SpinnerComponent } from '../shared/spinner/spinner.component';


@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, SpinnerComponent],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss'
})
export class PasswordResetComponent {

  password1: string = '';
  password2: string = '';
  token: string | null = '';
  resetWorked: boolean = false;
  loadingReset = false;


  constructor(private route: ActivatedRoute, private as: AuthService, private router: Router) {}


  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('ref');
  }


  async resetPassword(form: NgForm) {
    if(form.valid) {
      if (this.password1 !== this.password2) {
          return;
      }
      if(this.token) {
        try {
          this.loadingReset = true;
          let resp: any = await this.as.resetUserPassword(this.password1, this.token);
          console.log(resp);

          this.resetWorked = true;
          setTimeout(() => {
            this.router.navigateByUrl('/start-page');
          }, 5000);
        } catch(e) {
          console.error(e);
          this.loadingReset = false;
        }
      }
    }
  }

  
}
