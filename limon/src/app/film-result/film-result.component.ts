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
  public catalog = [
    {
      poster:'../../assets/films/1917-poster.jpg',
      title: '1917',
      prod:'Universal Studios',
      price: ''
    },
    {
      poster:'../../assets/films/batman-poster.jpg',
      title: 'The Dark Knights: Le chevalier noir',
      prod:'Warner Bros',
      price: '4.45 €'
    },
    {
      poster:'../../assets/films/avengers-poster.jpg',
      title: 'Avengers: Endgame',
      prod:'Marvel Cinematic Universe',
      price: '3.22€'
    },
    {
      poster:'../../assets/films/godzilla-poster.jpg',
      title: 'Godzilla',
      prod:'Warner Bros',
      price: ''
    },
    {
      poster:'../../assets/films/1917-poster.jpg',
      title: '1917',
      prod:'Universal Studios',
      price: ''
    },
    {
      poster:'../../assets/films/batman-poster.jpg',
      title: 'The Dark Knights: Le chevalier noir',
      prod:'Warner Bros',
      price: '4.45 €'
    },
    {
      poster:'../../assets/films/avengers-poster.jpg',
      title: 'Avengers: Endgame',
      prod:'Marvel Cinematic Universe',
      price: '3.22€'
    },
    {
      poster:'../../assets/films/godzilla-poster.jpg',
      title: 'Godzilla',
      prod:'Warner Bros',
      price: ''
    }
  ]

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
