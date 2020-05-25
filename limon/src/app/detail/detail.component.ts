import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../movie.service';
import { MobileService } from '../mobile.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public isAuth = true;
  public isMobile = false;
  public isMark = false;
  public title: string;
  public prod: string;
  public category: string;
  public date: string;
  public description: string;
  public price: string;
  public poster: string;
  public hero: string;
  public reviews: any[];
  note: string;
  
  constructor(private movieService:MovieService,
              private mobileService:MobileService,
              private route: ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];  // get id from url
    // get information from service
    this.title = this.movieService.getMovieById(+id).title;
    this.prod = this.movieService.getMovieById(+id).prod;
    this.category = this.movieService.getMovieById(+id).category;
    this.date = this.movieService.getMovieById(+id).date;
    this.description = this.movieService.getMovieById(+id).description;
    this.price = this.movieService.getMovieById(+id).price;
    this.poster = this.movieService.getMovieById(+id).poster;
    this.hero = this.movieService.getMovieById(+id).hero;
    this.note = this.movieService.getMovieById(+id).note;
    this.reviews = this.movieService.getMovieById(+id).review;

    this.isMobile = this.mobileService.getIsMobile(); //Detect if mobile device at start
  }
  onWatch() {
    return(this.isMark = !this.isMark)
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = this.mobileService.getIsMobile(); //detect changes of viewport
  }


  // Stripe
  pay() {    
 
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_DeZzMPNpBYMz6rr8P0noCD2n00RXOc7lTx',
      locale: 'auto',
      token: ()=> { this.redirecTo() }
    });
 
    handler.open({
      name: 'Limon',
      description: 'Paiement sécurisé avec Stripe',
      amount: this.price
    });
 
  }

  redirecTo() {
    this.router.navigate(['complete']);
  }

}
