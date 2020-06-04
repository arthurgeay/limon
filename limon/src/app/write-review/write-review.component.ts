import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private http:HttpClient, private formBuilder: FormBuilder, private route:ActivatedRoute, private movieService:MovieService) { }

  ngOnInit(): void {
    this.movieID = Number(this.route.snapshot.params['id']);  // get id from url
    this.initForm();
  }

  initForm() {
    this.reviewSubscription = this.movieService.reviewSubject.subscribe(
      (data:any)=>{
        this.contentEdit = data;
      }
    )
    if (this.contentEdit !== ""){
      this.userForm = this.formBuilder.group({
        'review': [this.contentEdit, Validators.required]
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
    const formData = new FormData();
    formData.append('message', formValue.toString());
    this.http.post(`https://api-limon.app-tricycle.com/api/review/${this.movieID}`, formData)
    .subscribe(
      (data:any)=>{
        console.log(data);
      },
      (error)=>{
        console.log(error);
      }
    )
  }

}
