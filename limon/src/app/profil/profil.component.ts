import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';

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
  public isPremium: boolean;
  public isAdmin:boolean;
  public isModal:boolean;
  public userSubscription: Subscription;
  public actualUserSubscription:  Subscription;
  public userForm: FormGroup;
  public datePipeStr:string;
  public mail: string;
  public errors = [];

  constructor(private userService: UserService,
              private route:ActivatedRoute,
              private authService: AuthService,
              private formBuilder:FormBuilder,
              private http:HttpClient,
              private router:Router) { }
 
  ngOnInit(): void {
    const route = this.route.snapshot.routeConfig.path;
    // @ts-ignore
    this.path = this.route.snapshot._routerState.url;
    this.id = Number(this.route.snapshot.params['id']);  // get id from url

    // determines which type of user
    this.isActual = route === 'profil' ? true : false;
    this.isPremium = this.authService.isPremium();
    this.isAdmin = this.authService.isAdmin();
    
    //display information for actual user or a specific user
    if (this.isActual) {
      this.displayActualUser();
    }
    else {
      this.displayParticularUser();
    }

  }


  /**
   * method:void
   *    open or hide settings menu
   */
  onOpenSettings():void {
    this.isSettings = !this.isSettings;
  }


  /**
   * method:void
   *    pass to edit mode
   */
  onEdit():void {
    this.isEdit = !this.isEdit;
  }

  /**
   * method: void
   *    display/hide the delete popup
   */
  swapModal() {
    this.isModal = !this.isModal;
  }

/**
 * method:void
 *    display info from actual user
 */
  displayActualUser():void {
    this.actualUserSubscription = this.userService.userActualSubject.subscribe(
      (data:any)=>{
        this.user = data;
        const md5 = new Md5();
        this.mail = md5.appendStr(data.email).end().toString();
        this.initForm();
      }
    );
    this.userService.getActualUser();
  }


  /**
   * method:void
   *    display info from a specific user
   */
  displayParticularUser():void {
    this.userSubscription = this.userService.userSubject.subscribe(
      (data:any)=>{
        this.user = data;
        const md5 = new Md5();
        this.mail = md5.appendStr(data.email).end().toString();
        this.initForm();
      }
    );
    this.userService.getUserById(this.id);
  }

  /**
   * method:void
   *      logout
   */
  logout():void {
    this.authService.logout();
  }



  /**
   * method:void
   *      initialize the from
   */
  initForm():void {
      this.userForm = this.formBuilder.group({
        'fullname': [this.user.fullname , Validators.required],
        'email': [this.user.email, Validators.required],
        'birthday': [this.user.birthday, Validators.required]
      });
  }

  /**
   * method:void
   *      send modifications of user profil to the server
   */
  onSubmitForm() {
    this.onEdit();
    const formValue = this.userForm.value;
    this.userForm.reset();

    formValue['birthday'] = new Date(formValue['birthday']).toLocaleDateString('en');
    
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
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([this.path]);
        });
      },
      (error)=>{
        if(error.error.errorMessages) {
          error.error.errorMessages.forEach(element => {
            this.errors.push(element);
          });
        } else {
          this.errors.push("Une erreur s'est produite");
        }
      }
    )
  }

}
