import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, from, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private router: Router, private auth: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token;
    token = sessionStorage.getItem('access_token');
    if(!token) {
      token = localStorage.getItem('access_token');
    }

    if (token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(request).pipe(
      catchError((err) => {
         if (err instanceof HttpErrorResponse && err.status === 401) {
          // Wenn der Status 401 ist, versuche einen neuen Access Token zu generieren
          return from(this.auth.generateAccesToken()).pipe(
            switchMap(() => {

              let newToken;
              newToken = sessionStorage.getItem('access_token');
              if(!newToken){
                newToken = localStorage.getItem('access_token');
              }
              if (newToken) {
                // Klone die ursprüngliche Anfrage und setze den neuen Access Token
                const clonedRequest = request.clone({
                  setHeaders: { Authorization: `Bearer ${newToken}` }
                });
                // Wiederhole die ursprüngliche Anfrage mit dem neuen Access Token
                return next.handle(clonedRequest);
              } else {
                // Wenn kein neuer Token generiert werden konnte, leite auf die Startseite um
                this.router.navigateByUrl('');
                return throwError(() => new Error('Token refresh failed'));
              }
            })
          );
        } else {
          // Bei anderen Fehlern handle sie hier oder leite den Fehler weiter
          return throwError(() => err);
        }
      })
    )
  }
}
