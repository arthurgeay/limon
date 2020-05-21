import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public title: string;
  public prod: string;
  public date: string;
  public description: string;
  public price: string;
  
  constructor(private movieService:MovieService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.title = this.movieService.getMovieById(+id).title;
  }

}
