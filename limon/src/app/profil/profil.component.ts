import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  public id:number;
  public path:any;
  public user:any;
  public isSettings = false;
  public isEdit = false;
  public isActual: boolean;
  public userSubscription: Subscription;
  public actualUserSubscription:  Subscription;
  userForm: FormGroup;
  datePipeStr:string;

  constructor(private userService: UserService,
    private route:ActivatedRoute,
    private authService: AuthService,
    private formBuilder:FormBuilder,
    private http:HttpClient,
    private datePipe:DatePipe,
    private router:Router) { }

  ngOnInit(): void {
    const route = this.route.snapshot.routeConfig.path;
    // @ts-ignore
    this.path = this.route.snapshot._routerState.url;
    this.id = Number(this.route.snapshot.params['id']);  // get id from url
    this.isActual = route === 'profil' ? true : false;
    
    if (this.isActual) {
      this.displayActualUser();
    }
    else {
      this.displayParticularUser();
    }
  }


  onOpenSettings() {
    this.isSettings = !this.isSettings;
  }

  onEdit() {
    this.isEdit = !this.isEdit;
  }

  displayActualUser() {
    this.actualUserSubscription = this.userService.userActualSubject.subscribe(
      (data:any)=>{
        this.user = data;
        this.initForm();
      }
    );
    this.userService.getActualUser();
  }

  displayParticularUser() {
    this.userSubscription = this.userService.userSubject.subscribe(
      (data:any)=>{
        this.user = data;
        this.initForm();
      }
    );
    this.userService.getUserById(this.id);
  }

  logout() {
    this.authService.logout();
  }




  initForm() {
    this.user.birthday = this.datePipe.transform(this.user.birthday, 'MMMM d, y')
      this.userForm = this.formBuilder.group({
        'fullname': [this.user.fullname , Validators.required],
        'email': [this.user.email, Validators.required],
        'birthday': [this.user.birthday, Validators.required]
      });
  }


  onSubmitForm() {
    this.onEdit();
    const formValue = this.userForm.value;
    this.userForm.reset();
    const body = new HttpParams()
    .set('fullname', formValue['fullname'])
    .set('email', formValue['email'])
    .set('birthday', formValue['birthday'])


    this.http.put(`https://api-limon.app-tricycle.com/api/user/?userId=${this.user.id}`,
    body.toString(),
    { 
      headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
    })
    .subscribe(
      (data:any)=>{
        console.log(data);
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([this.path]);
        });
      },
      (error)=>{
        console.log(error);
      }
    )
  }

}
