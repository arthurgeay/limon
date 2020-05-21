import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';
import { MobileService } from '../mobile.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public isMobileD = false;
  public title: string;
  public prod: string;
  public date: string;
  public description: string;
  public price: string;
  public hero: string;
  
  constructor(private movieService:MovieService,
              private mobileService:MobileService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];  // get id from url
    // get information from service
    this.title = this.movieService.getMovieById(+id).title;
    this.prod = this.movieService.getMovieById(+id).prod;
    this.date = this.movieService.getMovieById(+id).date;
    this.description = this.movieService.getMovieById(+id).description;
    this.price = this.movieService.getMovieById(+id).price;
    this.hero = this.movieService.getMovieById(+id).hero;

    this.isMobileD = this.mobileService.getIsMobile(); //Detect if mobile device at start
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobileD = this.mobileService.getIsMobile(); //detect changes of viewport
  }
}
