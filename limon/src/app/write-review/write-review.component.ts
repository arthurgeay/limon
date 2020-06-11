import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MovieService } from '../movie.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-write-review',
  templateUrl: './write-review.component.html',
  styleUrls: ['./write-review.component.scss']
})
export class WriteReviewComponent implements OnInit {

  public movieID: any;
  public userForm: FormGroup;
  public reviewSubscription: Subscription;
  public contentEdit: any;
  public isEdit:boolean = false;
  public path:any;
  public errors = [];
  public isAuth: boolean;

  constructor(private http:HttpClient,
              private formBuilder: FormBuilder,
              private route:ActivatedRoute,
              private router:Router,
              private authService:AuthService,
              private movieService:MovieService) { }

  ngOnInit(): void {
    // @ts-ignore
    this.path = this.route.snapshot._routerState.url;
    this.movieID = Number(this.route.snapshot.params['id']);  // get id from url
    this.contentEdit = { "id": 0,"content":''};
    this.isAuth = this.authService.isAuth();
    //@ts-ignore
    this.reviewSubscription = this.movieService.reviewSubject.subscribe(
      (data:any)=>{
        this.contentEdit = data;
        this.isEdit = true;
        this.initForm();
      }
    )
    this.initForm();
  }


  /**
   * method: void
   *    initialize the form
   */
  initForm() {
    if (this.contentEdit.content !== ""){
      this.userForm = this.formBuilder.group({
        'review': [this.contentEdit.content, Validators.required]
      });
    }
    else {
      this.userForm = this.formBuilder.group({
        'review': ['', Validators.required]
      });
    }

  }

  /**
   * method: void
   *    send data to server (create review or edit review)
   */
  onSubmitForm() {
    const formValue = this.userForm.value['review'];
    this.userForm.reset();

    if (!this.isEdit)
    {
      const formData = new FormData();
      formData.append('message', formValue.toString());
      this.http.post(`https://api-limon.app-tricycle.com/api/review/${this.movieID}`, formData)
      .subscribe(
        (data:any)=>{
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([this.path]);
          });
        },
        (error)=>{
          if(error.error.message === "JWT Token not found") {
            this.errors.push('Vous devez être connecté pour écrire un avis');
          } else if(error.error.errorMessages) {
            error.error.errorMessages.forEach(element => {
              this.errors.push(element);
            });
          } else {
            this.errors.push("Une erreur s'est produite");
          }
        }
      )
    }
    else {
      const body = new HttpParams()
      .set('message', formValue);
      this.http.put(`https://api-limon.app-tricycle.com/api/review/${this.contentEdit.id}`,
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

}
