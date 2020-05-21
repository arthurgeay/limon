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
      category: 'Guerre',
      date: '2019',
      price: '',
      description: 'Le 6 avril 1917, la Première Guerre mondiale fait rage sur le front Ouest. L\'armée allemande s\'est retirée d\'un secteur du front occidental dans le Nord de la France. La reconnaissance aérienne a repéré que les Allemands ne battent pas en retraite mais ont effectué un retrait tactique sur la ligne Hindenburg, où ils attendent les Britanniques.',
      hero: '../../assets/films/1917-hero.jpg'
    },
    {
      id: 2,
      poster:'../../assets/films/batman-poster.jpg',
      title: 'The Dark Knights: Le chevalier noir',
      prod:'Warner Bros',
      category: 'Action',
      date: '',
      price: '4.40 €',
      description: 'Batman est plus que jamais déterminé à éradiquer le crime organisé qui sème la terreur en ville. Epaulé par le lieutenant Jim Gordon et par le procureur de Gotham City, Harvey Dent, Batman voit son champ d\'action s\'élargir. ',
      hero: '../../assets/films/batman-hero.jpg'
    },
    {
      id: 3,
      poster:'../../assets/films/avengers-poster.jpg',
      title: 'Avengers: Endgame',
      prod:'Marvel Cinematic Universe',
      category: 'Super-Héros',
      date: '2019',
      price: '',
      description: 'Le Titan Thanos, ayant réussi à s\'approprier les six Pierres d\'Infinité et à les réunir sur le Gantelet doré, a pu réaliser son objectif de pulvériser la moitié de la population de l\'Univers. Cinq ans plus tard, Scott Lang, alias Ant-Man, parvient à s\'échapper de la dimension subatomique où il était coincé.',
      hero: '../../assets/films/avengers-hero.jpg'
    },
    {
      id: 4,
      poster:'../../assets/films/godzilla-poster.jpg',
      title: 'Godzilla',
      prod:'Warner Bros',
      category: 'Science-Fiction',
      date: '2014',
      price: '4.20 €',
      description: 'Le physicien nucléaire Joseph Brody enquête sur de mystérieux phénomènes qui ont lieu au Japon. Refusant de s\'en tenir à la version officielle qui évoque un tremblement de terre, le scientifique revient sur les lieux du drame accompagné par son fils Ford, soldat dans la Navy. Ils découvrent que les incidents ne sont pas liés à une catastrophe naturelle, mais à des monstres réveillés par des essais nucléaires dans le Pacifique au lendemain de la Seconde Guerre mondiale.',
      hero: '../../assets/films/godzilla-hero.jpeg'
    },
    {
      id: 5,
      poster:'../../assets/films/1917-poster.jpg',
      title: '1917',
      prod:'Universal Studios',
      category: '',
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
      category: '',
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
      category: '',
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
      category: '',
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
