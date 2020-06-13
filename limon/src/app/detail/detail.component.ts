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
  public isCheck:boolean = false;
  public isModal:boolean;
  public movieSubscription: Subscription;
  public movie: any;
  public note: string;
  public movieID: number;
  public direction:string = "buy";
  public catalog: any;
  public isEmpty: boolean;
  public isReviewEmpty: boolean = false;
  public usrNote: any;
  
  constructor(private movieService:MovieService,
              private mobileService:MobileService,
              private authService:AuthService,
              private route: ActivatedRoute,
              private router:Router,
              private http:HttpClient) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];  // get id from url
    this.movieID = Number(id);

    // determine type of user
    this.isAuth = this.authService.isAuth();
    this.isPremium = this.authService.isPremium();
    this.isAdmin = this.authService.isAdmin();


    // get movie information
    this.movieSubscription = this.movieService.movieSubject.subscribe(
      (data:any)=>{
        // if the movie doesn't exist in database
        if (data == 'not found') {
          this.router.navigate(['/']);
        }
        else {
          this.movie = data.movie[0];
          this.reviews = data.movie[0].reviews;
          this.isReviewEmpty = this.reviews.length == 0 ? true : false;
          this.usrNote = data.user_note;
          this.isPurchase = data.buy;
          if (data.movie.avg_score != null) {
            this.note = data.movie.avg_score.substring(0,1);
          }
        }
      }
    );
    this.movieService.getMovieById(+id);

    // check if the movie is inside the watchlist
    if (this.isAuth) {
      this.isInsideWatchlist();
    }
    this.isMobile = this.mobileService.getIsMobile(); //Detect if mobile device at start
  }


  /**
   * method: void
   *    check if the movie is in the watchlist to adapt the button
   */

  isInsideWatchlist():void {
    this.http.get(`https://api-limon.app-tricycle.com/api/watchlist/added/${this.movieID}`)
    .subscribe(
      (data:any)=>{
        this.isMark = data.already_add;
      },
      (error)=>{
        // console.log(error);
      }
    )
  }


  /**
   * method: void
   *    play the movie and add it to history
   */
  onPlay():void {
    this.isView = !this.isView
    this.http.get(`https://api-limon.app-tricycle.com/api/user/movie-watch/${this.movieID}`)
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
   *    add/remove the movie to the watchlist
   */
  onWatch():void {
    if (this.isMark) {
      const formData = new FormData();
      formData.append('movie', this.movieID.toString())
      this.http.post(`https://api-limon.app-tricycle.com/api/watchlist/`, formData)
      .subscribe(
        (data:any)=>{
        },
        (error)=>{
          // console.log(error);
        }
      )
    }
    else {
      this.http.delete(`https://api-limon.app-tricycle.com/api/watchlist/${this.movieID}`)
      .subscribe(
        (data:any)=>{
        },
        (error)=>{
          // console.log(error);
        }
      )
    }
  }

  /**
   * method: void
   *    display/hide the delete popup
   */
  swapModal():void {
    this.isModal = !this.isModal;
  }


  /**
   * method: boolean
   *  change the state of the "add to watchlist button
   */
  changeMark():boolean {
    return(this.isMark = !this.isMark)
  }

  /**
   * method: void
   *    see if the app is running on mobile
   */
  @HostListener('window:resize', ['$event'])
  onResize():void {
    this.isMobile = this.mobileService.getIsMobile(); //detect changes of viewport
  }

  /**
   * method: void
   *    display/hide the checkout popup
   */
  buy():void {
    this.isCheck = !this.isCheck;
  }

  /**
   * method: void
   *    redirect to download page
   */
  download():void {
    this.router.navigate([`complete/${this.movieID}`]);
  }

  /**
   * method: void
   *    redirect to edit page
   */
  onEdit():void {
    this.router.navigate([`edit/${this.movieID}`]);
  }
}
