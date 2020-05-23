import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-film-result',
  templateUrl: './film-result.component.html',
  styleUrls: ['./film-result.component.scss']
})
export class FilmResultComponent implements OnInit {

  public isEmpty: boolean = false;
  public isAlph = false;
  public isPrice = false;
  public isDate = false;
  public catalog: any[];

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.catalog = this.movieService.catalog;
  }

  onAlph() {
    return(this.isAlph = !this.isAlph)
  }

  onPrice() {
    return(this.isPrice = !this.isPrice)
  }

  onDate() {
    return(this.isDate = !this.isDate)
  }
}
