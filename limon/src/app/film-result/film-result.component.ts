import { Component, OnInit, HostListener } from '@angular/core';
import { MovieService } from '../movie.service';
import { MobileService } from '../mobile.service';

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
  isMobile: boolean;

  constructor(private movieService: MovieService,
    private mobileService:MobileService) { }

  ngOnInit(): void {
    this.catalog = this.movieService.catalog;
    this.isMobile = this.mobileService.isMobile;//prendre le ismobile du service  
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

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = this.mobileService.getIsMobile(); //detect changes of viewport
  }
}
