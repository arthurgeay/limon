import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  public isLogin = false;
  userForm: FormGroup;

  constructor(private route:ActivatedRoute, 
              private formBuilder: FormBuilder,
              private authService: AuthService) { }

  ngOnInit(): void {
    const route = this.route.snapshot.routeConfig.path;
    this.isLogin = route === 'login' ? true : false;

    this.initForm();
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

  /**
   * Send data for login
   */
  onSubmitForm() {
    const formValue = this.userForm.value;
    // console.log(formValue);
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
