import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './models/user.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, 
              private router: Router,
              private userService: UserService) { }

  errorSubject = new Subject<any[]>();
  errors = [];

  authSubject = new Subject<any[]>();
  premiumSubject = new Subject<any[]>();
  auth:any;
  premium:any;
  
  /**
   * Save in local storage
   * @param token 
   */
  private saveInLocalStorage(token, expires, roles, subscription) {
    localStorage.setItem('token', token);
    localStorage.setItem('expires', expires);
    localStorage.setItem('roles', roles);
    localStorage.setItem('subscription', JSON.stringify(subscription));
  }

  /**
   * Delete all info in localStorage
   */
  private deleteInLocalStorage() {
    localStorage.clear();
  }

  /**
   * Return if the user is auth 
   */
  isAuth() {
    const now = new Date();
    this.auth =  now < new Date(localStorage.getItem('expires'));
    if(!this.auth) { 
      this.premium = false;
      this.EmitOnPremium();
    }
    this.EmitOnAuth();
    return this.auth
  }

    /**
   * Check the user account
   */
  isPremium() {
    this.premium = JSON.parse(localStorage.getItem('subscription')) ? true : false;
    console.log(this.premium);
    
    this.EmitOnPremium();
    return this.premium
  }

  /**
   * Return bool if is an admin user
   */
  isAdmin() {
    if(localStorage.getItem('roles')) {
      return localStorage.getItem('roles').split(',').includes('ROLE_ADMIN');
    }
    return false;
  }

  EmitOnAuth() {
    this.authSubject.next(this.auth);
  }

  EmitOnPremium() {
    this.premiumSubject.next(this.premium);
  }

  /**
   * Return bool if is a normal user
   */
  // isUser() {
  //   return localStorage.getItem('roles') == 'ROLE_USER' ? true : false;
  // }

  /**
   * Check end of subcription date
   */
  // isPremiumActive() {
  //   if(this.isPremium()) {
  //     const now = new Date();
  //     return now < new Date(JSON.parse(localStorage.getItem('subscription')).end_date.date);
  //   } 

  //   return false;
  // }

  /**
   * Login a user
   * @param user 
   */
  login(user: User) {
    this.httpClient.post('https://api-limon.app-tricycle.com/api/login', {
      username: user.email,
      password: user.password
    }).subscribe(
      (res: any) => {
        this.saveInLocalStorage(res.token, res.expires.date, res.data.roles, res.data.subscription);

        this.userService.user = { ...res.data };
        this.userService.emitUserSubject();

        this.router.navigate(['']);
      },
      (errors) => {
        if(errors.error.message == 'Invalid credentials.') {
          this.errors.push('Identifiants invalides');
        } else {
          this.errors.push("Une erreur s'est produite");
        }
        this.emitErrorSubject();
      }
    )
  }

  /**
   * Register a new user
   * @param user 
   */
  register(user: User) {
    const formData = new FormData();
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('fullname', user.fullname);
    formData.append('birthday', user.birthday);

    this.httpClient.post('https://api-limon.app-tricycle.com/api/register', formData).subscribe(
      (res: any) => {
        this.saveInLocalStorage(res.token, res.expires, res.user.roles, null);
        
        this.userService.user = { ...res.user };
        this.userService.emitUserSubject();

        this.router.navigate(['']);
      },
      (errors) => {
        if(errors.error.errorMessages) {
          this.errors.push(errors.error.errorMessages);
        } else {
          this.errors.push("Une erreur s'est produite");
        }
        this.emitErrorSubject();
      }
    )
  }

  /**
   * Log out a user
   */
  logout() {
    this.deleteInLocalStorage();
    this.userService.user = null;
    this.userService.emitUserSubject();
    this.router.navigate(['/'])
    this.isAuth();
  }

  emitErrorSubject() {
    this.errorSubject.next(this.errors);
  }
}
