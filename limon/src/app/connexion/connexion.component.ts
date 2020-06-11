import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  public isLogin = false;
  userForm: FormGroup;
  errorsSubscription: Subscription;
  errors: any[];

  constructor(private route:ActivatedRoute, 
              private formBuilder: FormBuilder,
              private authService: AuthService) { }

  ngOnInit(): void {
     //define the content of the page from the URL
    const route = this.route.snapshot.routeConfig.path;
    this.isLogin = route === 'login' ? true : false;
    this.initForm();

    this.authService.errors = []; // Reset errors:

    // Subscribe to errors subject emit by auth and register method
    this.errorsSubscription = this.authService.errorSubject.subscribe(
      (errors) => this.errors = errors
    );
    this.authService.emitErrorSubject();
  }

  /**
   * method: void
   *    Initialize form
   */
  initForm(): void {
    if(this.isLogin) {
      this.userForm = this.formBuilder.group({
        'username': ['', [Validators.required, Validators.email]],
        'password': ['', Validators.required]
      });
    } else {
      this.userForm = this.formBuilder.group({
        'email': ['', { validators: [Validators.required, Validators.email], updateOn: 'change'}],
        'password': ['', { validators: [Validators.required, Validators.minLength(4)], updateOn: 'change'}],
        'fullname': ['', Validators.required],
        'birthday': ['', Validators.required]
      });
    }
  }

  /**
   * method: void
   *  display errors
   */
  onErrors():void {
    if(this.userForm.get('email').errors) {
      this.errors[0] = 'Veuillez saisir une adresse e-mail valide';
    } 

    if(this.userForm.get('password').errors) {
      this.errors[1] = 'Le mot de passe doit contenir au minimum 4 caractères';
    } 
  }

  /**
   * method: void
   *    Send data for login
   */
  onSubmitForm():void {
    this.authService.errors = [];
    this.authService.emitErrorSubject();
    const formValue = this.userForm.value;

    let user = null;  //Reset user

    // sending values depending is login or sign in
    if(this.isLogin) {
      user = new User(
        formValue['username'],
        formValue['password']
      );
      this.authService.login(user);

    } else {
      user = new User(
        formValue['email'],
        formValue['password'],
        formValue['birthday'],
        formValue['fullname']
      );
      this.authService.register(user);
    }

  }

}
