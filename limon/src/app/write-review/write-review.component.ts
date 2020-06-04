import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-write-review',
  templateUrl: './write-review.component.html',
  styleUrls: ['./write-review.component.scss']
})
export class WriteReviewComponent implements OnInit {

  movieID: any;
  userForm: FormGroup;

  constructor(private http:HttpClient, private formBuilder: FormBuilder, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.movieID = Number(this.route.snapshot.params['id']);  // get id from url
    this.initForm();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      'review': ['', Validators.required]
    });
  }

  onNote() {
    const formData = new FormData();
    formData.append('message', toString());
    this.http.post(`https://api-limon.app-tricycle.com/api/rating/${this.movieID}`, formData)
    .subscribe(
      (data:any)=>{
      },
      (error)=>{
        console.log(error);
      }
    )
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
