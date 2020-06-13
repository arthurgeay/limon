import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { AuthService } from './auth.service';

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

  constructor(private http:HttpClient,
              private authService:AuthService) { }


  /**
   * method: void
   *    get  movie for first page (new and popular)
   */
  getAllMovies():void {
    this.http.get('https://api-limon.app-tricycle.com/api/movie/all')
    .subscribe(
      (data:any)=>{
        this.movies = data;
        this.EmitOnMovies();
      },
      (error)=>{
        // console.log(error);
      }
    )
  }

  //emit to subscription
  EmitOnMovies():void {
    this.moviesSubject.next(this.movies);
  }

  /**
   * method: void / params: number
   *    get specific movie by id
   */
  getMovieById(id:number):void{
    this.http.get(`https://api-limon.app-tricycle.com/api/movie/${id}`)
    .subscribe(
      (data:any)=>{
        this.movie = data;
        this.EmitOnMovie();
      },
      (error)=>{
        // console.log(error);
        if (error.status == 404) {
          this.movie = 'not found';
          this.EmitOnMovie();
        }
      }
    )
  }
  //emit to subscription
  EmitOnMovie():void {
    this.movieSubject.next(this.movie);
  }


/**
 * method: void / params: number, string
 *    doawnload a specific movie
 */
public downloadMovieById(id:number, name:string):void {
    let mediaType = 'application/mp4';
    this.http.get(`https://api-limon.app-tricycle.com/api/movie/${id}/download`, { responseType: 'blob' })
    .subscribe(
      (data:any)=>{
        this.downl = data;
        let blob = new Blob([data], { type:mediaType})
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
        // console.log(error);
      }
    )
  }

    //emit to subscription
  EmitOnDl():void {
    this.DlSubject.next(this.downl);
  }

  /**
   * method: void / params: number
   *    purchase a specific movie
   */
  public purchaseMovieById(id:number):void {
    this.http.get(`https://api-limon.app-tricycle.com/api/purchase/${id}`)
    .subscribe(
      (data:any)=>{
      },
      (error)=>{
        // console.log(error);
      }
    )
  }


  /**
   * method: void
   *    edit a review
   */
  public getAllCategories():void {
    this.http.get(`https://api-limon.app-tricycle.com/api/category/all`)
    .subscribe(
      (data:any)=>{
        this.categories = data;
        this.EmitOnCat();
      },
      (error)=>{
        // console.log(error);
      }
    )
  }
  //emit to subscription
  EmitOnCat():void {
    this.categorySubject.next(this.categories);
  }

  /**
   * method: void
   *    edit a review
   */
  public EditReview(message:any):void {
    this.review = message;
    this.EmitOnReview();
  }

  //emit to subscription
  EmitOnReview():void {
    this.reviewSubject.next(this.review);
  }



  /**
   * method: void
   *    subscribe to a premium plan
   */
  public subscribeOnMovie():void {
    this.http.get(`https://api-limon.app-tricycle.com/api/subscription`)
    .subscribe(
      (data:any)=>{
        localStorage.setItem('subscription', JSON.stringify(data.subscription));
        this.authService.isPremium();
      },
      (error)=>{
        // console.log(error);
      }
    )
    
  }
}
