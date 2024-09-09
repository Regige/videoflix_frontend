import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }


  public async generateAccesToken() {
    try {
        const url = environment.baseUrl + '/accounts/api/token/refresh/';
    
        let token;

        const body = {
          "refresh": token
        }

        token = sessionStorage.getItem('refresh_token');

        if(token) {
          let resp: any = await lastValueFrom(this.http.post(url, body));

          sessionStorage.setItem('access_token',resp['access'] );

        } else if(!token) {
          token = localStorage.getItem('refresh_token');

          let resp: any = await lastValueFrom(this.http.post(url, body));

          localStorage.setItem('access_token',resp['access'] );
        }
    } catch(e) {
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('refresh_token');

        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        this.router.navigateByUrl('/start-page');
    }
  }


  public loginWithEmailAndPassword(email: string, password: string) {
    const url = environment.baseUrl + '/accounts/api/token/';
    const body = {
      "email": email,
      "password": password
    }
    return lastValueFrom(this.http.post(url, body));
  }


  public registerWithEmailAndPassword(email: string, password: string) {
    const url = environment.baseUrl + '/accounts/';
    const body = {
      "username": email,
      "email": email,
      "password": password
    }
    return lastValueFrom(this.http.post(url, body));
  }


  logoutUser() {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');

    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    sessionStorage.removeItem('selected_video');

    this.router.navigateByUrl('');

    // evtl noch Blacklist im Backend ergänzen mit dem Code - dann mit try and catch!
  }


  removeTokenFromStorage() {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    
    sessionStorage.removeItem('selected_video');

    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }



// Get (Post) ResetPassword Link
  
  getResetPasswordLink(email: string) {
    const url = environment.baseUrl + '/accounts/password_reset/';
    const body = {
    "email": email
    }
    return lastValueFrom(this.http.post(url, body));
  }


  resetUserPassword(password: string, token: string) {
    const url = environment.baseUrl + '/accounts/password_reset/confirm/?token=' + token;
    const body = {
    "password": password,
    "token": token
    }
    return lastValueFrom(this.http.post(url, body));
  }
}
