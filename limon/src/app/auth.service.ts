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
  errors: [string];
  
  /**
   * Save in local storage
   * @param token 
   */
  private saveInLocalStorage(token, expires) {
    localStorage.setItem('token', token);
    localStorage.setItem('expires', expires.date);
  }

  /**
   * Return if the user is auth 
   */
  isAuth() {
    const now = new Date();
    return  now < new Date(localStorage.getItem('expires'));
  }

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
        this.saveInLocalStorage(res.token, res.expires);

        this.userService.user = { ...res.data };
        this.userService.emitUserSubject();

        this.router.navigate(['']);
      },
      (errors) => {
        if(errors.error.message == 'Invalid credentials') {
          this.errors.push('Identifiant invalide');
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
        this.saveInLocalStorage(res.token, res.expires);
        
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
    localStorage.removeItem('token');
    localStorage.removeItem('expires');

    this.userService.user = null;
    this.userService.emitUserSubject();
    this.router.navigate(['/'])
  }

  emitErrorSubject() {
    this.errorSubject.next(this.errors);
  }
}
