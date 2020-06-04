import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../movie.service';
import { MobileService } from '../mobile.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public isAuth = true;
  public isMobile = false;
  public isMark = false;
  public isPurchase = false;
  public reviews: any[];
  public isCheck = false;
  public movieSubscription: Subscription;
  public movie: any;
  public note: string;
  public movieID: number;
  catalog: any;
  isEmpty: boolean;
  
  constructor(private movieService:MovieService,
              private mobileService:MobileService,
              private route: ActivatedRoute,
              private router:Router,
              private http:HttpClient) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];  // get id from url
    this.movieID = Number(id);
        
    this.movieSubscription = this.movieService.movieSubject.subscribe(
      (movie:any)=>{
        this.movie = movie;
        if (movie.note) {
          this.note = movie.note.substring(0,1);
        }
      }
    );
    this.movieService.getMovieById(+id);

    this.isMobile = this.mobileService.getIsMobile(); //Detect if mobile device at start
  }
  onWatch() {
    if (this.isMark) {
      const formData = new FormData();
      formData.append('movie', this.movieID.toString())
      this.http.post(`https://api-limon.app-tricycle.com/api/watchlist/`, formData)
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
      this.http.delete(`https://api-limon.app-tricycle.com/api/watchlist/${this.movieID}`)
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
