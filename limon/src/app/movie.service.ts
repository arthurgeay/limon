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
      prod:'Dreamworks SKG',
      date: '2019',
      price: '',
      description: 'Le 6 avril 1917, la Première Guerre mondiale fait rage sur le front Ouest. L\'armée allemande s\'est retirée d\'un secteur du front occidental dans le Nord de la France. La reconnaissance aérienne a repéré que les Allemands ne battent pas en retraite mais ont effectué un retrait tactique sur la ligne Hindenburg, où ils attendent les Britanniques. Deux jeunes soldats britanniques, les caporaux suppléants Will Schofield et Tom Blake, sont chargés par le général Erinmore d\'une mission vraisemblablement impossible : les lignes de communication étant coupées, ils vont devoir traverser seuls le no man\'s land et les lignes ennemies pour délivrer un message au deuxième bataillon du régiment Devonshire, stationné aux environs d\'Écoust-Saint-Mein. Ce message, annulant leur attaque planifiée, doit permettre de sauver du piège tendu par l\'armée allemande 1 600 soldats britanniques, parmi lesquels se trouve le lieutenant Joseph Blake, frère de Blake',
      hero: '../../assets/films/1917-hero.jpg'
    },
    {
      id: 2,
      poster:'../../assets/films/batman-poster.jpg',
      title: 'The Dark Knights: Le chevalier noir',
      prod:'Warner Bros',
      date: '',
      price: '4.40 €',
      description: '',
      hero: '../../assets/films/batman-hero.jpg'
    },
    {
      id: 3,
      poster:'../../assets/films/avengers-poster.jpg',
      title: 'Avengers: Endgame',
      prod:'Marvel Cinematic Universe',
      date: '',
      price: '',
      description: '',
      hero: '../../assets/films/avengers-hero.jpg'
    },
    {
      id: 4,
      poster:'../../assets/films/godzilla-poster.jpg',
      title: 'Godzilla',
      prod:'Warner Bros',
      date: '',
      price: '4.20 €',
      description: '',
      hero: '../../assets/films/godzilla-hero.jpeg'
    },
    {
      id: 5,
      poster:'../../assets/films/1917-poster.jpg',
      title: '1917',
      prod:'Universal Studios',
      date: '',
      price: '',
      description: '',
      hero: '../../assets/films/1917-hero.jpg'
    },
    {
      id: 6,
      poster:'../../assets/films/batman-poster.jpg',
      title: 'The Dark Knights: Le chevalier noir',
      prod:'Warner Bros',
      date: '',
      price: '3.40 €',
      description: '',
      hero: '../../assets/films/batman-hero.jpg'
    },
    {
      id: 7,
      poster:'../../assets/films/avengers-poster.jpg',
      title: 'Avengers: Endgame',
      prod:'Marvel Cinematic Universe',
      date: '',
      price: '',
      description: '',
      hero: '../../assets/films/avengers-hero.jpg'
    },
    {
      id: 8,
      poster:'../../assets/films/godzilla-poster.jpg',
      title: 'Godzilla',
      prod:'Warner Bros',
      date: '',
      price: '',
      description: '',
      hero: '../../assets/films/godzilla-hero.jpeg'
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
