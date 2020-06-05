import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MovieService } from '../movie.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-film',
  templateUrl: './edit-film.component.html',
  styleUrls: ['./edit-film.component.scss']
})
export class EditFilmComponent implements OnInit {
  userForm: FormGroup;
  public isEdit:boolean;
  categories: any[];
  categorySubscription: Subscription;
  movie:any;
  movieID:number;
  movieSubscription: Subscription;

  constructor(private http:HttpClient,
     private formBuilder:FormBuilder,
     private movieService:MovieService,
     private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.isEdit = this.route.snapshot.routeConfig.path === 'create' ? false : true;
    this.movieID = this.route.snapshot.params['id'];
    this.categorySubscription = this.movieService.categorySubject.subscribe(
      (data:any)=>{
        this.categories = data;
      }
    );
    this.movieService.getAllCategories();

    if (this.isEdit){
      this.movieSubscription = this.movieService.movieSubject.subscribe(
        (data:any)=>{
          this.movie = data;
          console.log(data);
          this.initForm();
        }
      )
      this.movieService.getMovieById(this.movieID);
    }
    else {
      this.initForm();
    }



  }

  initForm() {
    if (this.isEdit) {
      this.userForm = this.formBuilder.group({
        'title': [this.movie.title , Validators.required],
        'date': [this.movie.release_date.substring(0,4), Validators.required],
        'price': [this.movie.price, Validators.required],
        'prod': [this.movie.productor.name , Validators.required],
        'poster-img': [this.movie.poster_img, Validators.required],
        'cat': [this.movie.category.name, Validators.required],
        'desc': [this.movie.synopsis, Validators.required],
        'hero-img': [this.movie.hero_img, Validators.required]
      });
    }
    else {
      this.userForm = this.formBuilder.group({
        'title': ['', Validators.required],
        'date': ['', Validators.required],
        'price': ['', Validators.required],
        'prod': ['', Validators.required],
        'poster-img': ['', Validators.required],
        'cat': ['', Validators.required],
        'desc': ['', Validators.required],
        'hero-img': ['', Validators.required]
      });
    }

  }
  onSubmitForm() {
    const formValue = this.userForm.value;
    this.userForm.reset();
    if (!this.isEdit) {
      const formData = new FormData();
      formData.append('title', formValue['title']);
      formData.append('date', formValue['date']);
      formData.append('price', formValue['price']);
      formData.append('production', formValue['prod']);
      formData.append('poster_img', formValue['poster-img']);
      formData.append('category', formValue['cat']);
      formData.append('synopsis', formValue['desc']);
      formData.append('hero_img', formValue['hero-img']);
      this.http.post(`https://api-limon.app-tricycle.com/api/movie/`, formData)
        .subscribe(
          (data:any)=>{
            console.log(data);
          },
          (error)=>{
            console.log(error);
          }
        )
    }
    else {
      const body = new HttpParams()
      .set('title', formValue['title'])
      .set('date', formValue['date'])
      .set('price', formValue['price'])
      .set('production', formValue['prod'])
      .set('poster_img', formValue['poster-img'])
      .set('category', formValue['cat'])
      .set('synopsis', formValue['desc'])
      .set('hero_img', formValue['hero-img']);

      this.http.put(`https://api-limon.app-tricycle.com/api/movie/${this.movieID}`,
      body.toString(),
      { 
        headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
      })
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
}
