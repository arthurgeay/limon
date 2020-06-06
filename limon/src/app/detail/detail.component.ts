import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../movie.service';
import { MobileService } from '../mobile.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})

export class DetailComponent implements OnInit {
  public isAuth:boolean;
  public isAdmin:boolean;
  public isPremium:boolean;
  public isMobile = false;
  public isMark = false;
  public isPurchase = false;
  public isView = false;
  public reviews: any[];
  public isCheck = false;
  public movieSubscription: Subscription;
  public movie: any;
  public note: string;
  public movieID: number;
  public direction:string = "buy";
  catalog: any;
  isEmpty: boolean;
  isReviewEmpty: boolean = false;
  
  constructor(private movieService:MovieService,
              private mobileService:MobileService,
              private authService:AuthService,
              private route: ActivatedRoute,
              private router:Router,
              private http:HttpClient) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];  // get id from url
    this.movieID = Number(id);
    this.isAuth = this.authService.isAuth();
    this.isPremium = this.authService.isPremium();
    this.isAdmin = this.authService.isAdmin();

    this.movieSubscription = this.movieService.movieSubject.subscribe(
      (movie:any)=>{
        this.movie = movie;
        this.reviews = movie.reviews;
        this.isReviewEmpty = this.reviews.length == 0 ? true : false;
        if (movie.note) {
          this.note = movie.note.substring(0,1);
        }
      }
    );
    this.movieService.getMovieById(+id);
    this.isInsideWatchlist();
    this.isMobile = this.mobileService.getIsMobile(); //Detect if mobile device at start
  }

  isInsideWatchlist() {
    this.http.get(`https://api-limon.app-tricycle.com/api/watchlist/added/${this.movieID}`)
    .subscribe(
      (data:any)=>{
        this.isMark = data.already_add;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  onPlay() {
    this.isView = !this.isView
    this.http.get(`https://api-limon.app-tricycle.com/api/user/movie-watch/${this.movieID}`)
    .subscribe(
      (data:any)=>{
      },
      (error)=>{
        console.log(error);
      }
    )
  
  }

  onWatch() {
    if (this.isMark) {
      const formData = new FormData();
      formData.append('movie', this.movieID.toString())
      this.http.post(`https://api-limon.app-tricycle.com/api/watchlist/`, formData)
      .subscribe(
        (data:any)=>{
        },
        (error)=>{
          console.log(error);
        }
      )
    }
    else {
      this.http.delete(`https://api-limon.app-tricycle.com/api/watchlist/${this.movieID}`)
      .subscribe(
        (data:any)=>{
        },
        (error)=>{
          console.log(error);
        }
      )
    }
  }

  onDelete() {
    this.http.delete(`https://api-limon.app-tricycle.com/api/movie/${this.movieID}`)
    .subscribe(
      (data:any)=>{
        this.router.navigate(['/'])
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  changeMark(){
    return(this.isMark = !this.isMark)
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = this.mobileService.getIsMobile(); //detect changes of viewport
  }

  buy() {
    this.isCheck = !this.isCheck;
  }

  download() {
    this.router.navigate([`complete/${this.movieID}`]);
  }

  onEdit() {
    this.router.navigate([`edit/${this.movieID}`]);
  }
}
