import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserToken } from '@shared/model/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL = `${environment.baseUrl}/auth`;

  private currentUserSubject: BehaviorSubject<UserToken>;

  public currentUser: Observable<UserToken>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<UserToken>(
      JSON.parse(localStorage.getItem('currentUser')),
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserToken {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<UserToken> {
    return this.http
      .post<UserToken>(`${this.baseURL}/login`, {
      des_email_usr: username,
      des_password_usr: password,
    })
      .pipe(
        map((user: UserToken) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        }),
      );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/home']);
  }

  decodeToken(): UserToken {
    const jwtHelper = new JwtHelperService();

    return jwtHelper.decodeToken(
      JSON.parse(localStorage.getItem('currentUser')).access_token,
    );
  }
}
