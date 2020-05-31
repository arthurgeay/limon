import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../movie.service';
import { MobileService } from '../mobile.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public isAuth = true;
  public isMobile = false;
  public isMark = false;
  public title: string;
  public prod: string;
  public category: string;
  public date: string;
  public description: string;
  public price: string;
  public poster: string;
  public hero: string;
  public reviews: any[];
  public isCheck = false;
  public movieSubscription: Subscription;
  public movie: any;
  note: string;
  
  constructor(private movieService:MovieService,
              private mobileService:MobileService,
              private route: ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];  // get id from url
    this.movieService.getMovieById(+id);
    this.movieService.EmitOnMovie();
    
    this.movieSubscription = this.movieService.moviesSubject.subscribe(
      (movie:any)=>{
        this.title = movie.title;
        this.prod = movie.prod;
        this.category = movie.category;
        this.date = movie.date;
        this.description = movie.description;
        this.price = movie.price;
        this.poster = movie.poster;
        this.hero = movie.hero;
        this.note = movie.note;
        this.reviews = movie.review;
        console.log(movie);
        
      }
    );
    this.isMobile = this.mobileService.getIsMobile(); //Detect if mobile device at start
  }
  onWatch() {
    return(this.isMark = !this.isMark)
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = this.mobileService.getIsMobile(); //detect changes of viewport
  }

  buy() {
    this.isCheck = !this.isCheck ;
  }

}
