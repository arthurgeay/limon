import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  public catalog = [
    {
      id: 1,
      poster:'../../assets/films/1917-poster.jpg',
      title: '1917',
      prod:'Universal Studios',
      price: ''
    },
    {
      id: 2,
      poster:'../../assets/films/batman-poster.jpg',
      title: 'The Dark Knights: Le chevalier noir',
      prod:'Warner Bros',
      price: '4.45 €'
    },
    {
      id: 3,
      poster:'../../assets/films/avengers-poster.jpg',
      title: 'Avengers: Endgame',
      prod:'Marvel Cinematic Universe',
      price: '3.22€'
    },
    {
      id: 4,
      poster:'../../assets/films/godzilla-poster.jpg',
      title: 'Godzilla',
      prod:'Warner Bros',
      price: ''
    },
    {
      id: 5,
      poster:'../../assets/films/1917-poster.jpg',
      title: '1917',
      prod:'Universal Studios',
      price: ''
    },
    {
      id: 6,
      poster:'../../assets/films/batman-poster.jpg',
      title: 'The Dark Knights: Le chevalier noir',
      prod:'Warner Bros',
      price: '4.45 €'
    },
    {
      id: 7,
      poster:'../../assets/films/avengers-poster.jpg',
      title: 'Avengers: Endgame',
      prod:'Marvel Cinematic Universe',
      price: '3.22€'
    },
    {
      id: 8,
      poster:'../../assets/films/godzilla-poster.jpg',
      title: 'Godzilla',
      prod:'Warner Bros',
      price: ''
    }
  ]
  constructor() { }

  getMovieById(id:number){
    const movie = this.catalog.find(
      (s) => {
        return s.id === id;
      }
    );
    return movie;
  }
}
