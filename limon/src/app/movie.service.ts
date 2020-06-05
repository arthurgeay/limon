import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  
  public reviewSubject = new Subject<any[]>();
  public DlSubject = new Subject<any[]>();
  public moviesSubject = new Subject<any[]>();
  public movieSubject = new Subject<any[]>();
  public categorySubject = new Subject<any[]>();
  public movies: any[];
  public movie: any;
  public downl: any;
  public categories: any;
  public review:any;

  constructor(private http:HttpClient) { }

  getAllMovies() {
    this.http.get('https://api-limon.app-tricycle.com/api/movie/all')
    .subscribe(
      (data:any)=>{
        this.movies = data;
        this.EmitOnMovies();
      },
      (error)=>{
        console.log(error);
      }
    )
  }


  EmitOnMovies() {
    this.moviesSubject.next(this.movies);
  }


  getMovieById(id:number){
    this.http.get(`https://api-limon.app-tricycle.com/api/movie/${id}`)
    .subscribe(
      (data:any)=>{
        this.movie = data[0];
        this.movie.note = data.avg_score;
        console.log(this.movie);
        
        this.EmitOnMovie();
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  EmitOnMovie() {
    this.movieSubject.next(this.movie);
  }

public downloadMovieById(id:number, name:string) {
    let mediaType = 'application/mp4';
    this.http.get(`https://api-limon.app-tricycle.com/api/movie/${id}/download`, { responseType: 'blob' })
    .subscribe(
      (data:any)=>{
        this.downl = data;
        let blob = new Blob([data], { type:mediaType})
        console.log(blob);
        const filename = `${name}-limon.mp4`;
        const url = window.URL.createObjectURL(blob);
        const a:HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;

        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        
        this.EmitOnDl();
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  EmitOnDl() {
    this.DlSubject.next(this.downl);
  }

  public purchaseMovieById(id:number) {
    this.http.get(`https://api-limon.app-tricycle.com/api/purchase/${id}`)
    .subscribe(
      (data:any)=>{
        console.log(data);        
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  /**
   * getAllCategories
   */
  public getAllCategories() {
    this.http.get(`https://api-limon.app-tricycle.com/api/category/all`)
    .subscribe(
      (data:any)=>{
        this.categories = data;
        this.EmitOnCat();
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  EmitOnCat() {
    this.categorySubject.next(this.categories);
  }

  public EditReview(message:any) {
    this.review = message;
    this.EmitOnReview();
  }

  EmitOnReview() {
    this.reviewSubject.next(this.review);
  }

}
