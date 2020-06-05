import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-write-review',
  templateUrl: './write-review.component.html',
  styleUrls: ['./write-review.component.scss']
})
export class WriteReviewComponent implements OnInit {

  movieID: any;
  userForm: FormGroup;
  reviewSubscription: Subscription;
  contentEdit: any;
  isEdit:boolean = false;
  path:any;

  constructor(private http:HttpClient,
     private formBuilder: FormBuilder,
      private route:ActivatedRoute,
      private router:Router,
       private movieService:MovieService) { }

  ngOnInit(): void {
    // @ts-ignore
    this.path = this.route.snapshot._routerState.url;
    this.movieID = Number(this.route.snapshot.params['id']);  // get id from url
    this.contentEdit = { "id": 0,"content":''};
    //@ts-ignore
    this.reviewSubscription = this.movieService.reviewSubject.subscribe(
      (data:any)=>{
        this.contentEdit = data;
        console.log(data);
        this.isEdit = true;
        this.initForm();
      }
    )
    this.initForm();
  }

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
    else {
      const body = new HttpParams()
      .set('message', formValue);
      console.log(formValue);
      
      this.http.put(`https://api-limon.app-tricycle.com/api/review/${this.contentEdit.id}`,
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

}
