import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';
import { MobileService } from '../mobile.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public isMobile = false;
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
    const id = this.route.snapshot.params['id'];
    this.title = this.movieService.getMovieById(+id).title;
    this.prod = this.movieService.getMovieById(+id).prod;
    this.date = this.movieService.getMovieById(+id).date;
    this.description = this.movieService.getMovieById(+id).description;
    this.price = this.movieService.getMovieById(+id).price;
    this.hero = this.movieService.getMovieById(+id).hero;

    this.isMobile = this.mobileService.isMobile; //prendre le ismobile du service
  }

}
