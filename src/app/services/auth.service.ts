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
    
        const token = localStorage.getItem('refresh_token');
    
        const body = {
          "refresh": token
        }
    
        let resp: any = await lastValueFrom(this.http.post(url, body));
        localStorage.removeItem('access_token');
        localStorage.setItem('access_token',resp['access'] );

    } catch(e) {
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
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigateByUrl('/start-page');

    // evtl noch Blacklist im Backend ergänzen mit dem Code - dann mit try and catch!
  }
}
