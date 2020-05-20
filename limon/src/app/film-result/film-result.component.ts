import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-film-result',
  templateUrl: './film-result.component.html',
  styleUrls: ['./film-result.component.scss']
})
export class FilmResultComponent implements OnInit {

  public isAlph = false;
  public isPrice = false;
  public isDate = false;

  constructor() { }

  ngOnInit(): void {
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
