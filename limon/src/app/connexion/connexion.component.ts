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
    const route = this.route.snapshot.routeConfig.path;
    this.isLogin = route === 'login' ? true : false;
    this.initForm();

    this.authService.errors = []; // Reset errors:

    this.errorsSubscription = this.authService.errorSubject.subscribe(
      (errors) => this.errors = errors
    );
    this.authService.emitErrorSubject();
  }

  /**
   * Initialize form
   */
  initForm() {
    if(this.isLogin) {
      this.userForm = this.formBuilder.group({
        'username': ['', [Validators.required, Validators.email]],
        'password': ['', Validators.required]
      });
    } else {
      this.userForm = this.formBuilder.group({
        'email': ['', [Validators.required, Validators.email]],
        'password': ['', [Validators.required, Validators.minLength(4)]],
        'fullname': ['', Validators.required],
        'birthday': ['', Validators.required]
      });
    }
  }


  onErrors() {
      if(this.userForm.get('password').errors) {
        this.errors[0] = 'Le mot de passe doit contenir au minimum 4 caractères';
      } else {
        this.errors = [];
      } 
  } 

  /**
   * Send data for login
   */
  onSubmitForm() {
    this.authService.errors = [];
    this.authService.emitErrorSubject();
    const formValue = this.userForm.value;

    let user = null;

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
