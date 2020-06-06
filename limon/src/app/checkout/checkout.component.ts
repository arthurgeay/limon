import { Component, OnInit, AfterContentInit, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../movie.service';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';

declare var Stripe;//: stripe.StripeStatic;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  @Input() public amount:number;
  @Input() public title:string;
  @Input() public id:number;
  @Input() public direction:string;
  @Input() public isCheck: boolean;
  @Output() public isCheckChange = new EventEmitter<boolean>();
  @ViewChild('cardElement', {static: false}) cardElement: ElementRef;
  public purchase:any;
  public user:any;
  stripe:any;
  card:any;
  cardErrors:any;
  loading = false;
  userSubscription: Subscription;

  constructor(private router:Router,
    private movieService:MovieService,
    private userService:UserService) { }

  ngOnInit(): void {
    this.stripe = Stripe('pk_test_DeZzMPNpBYMz6rr8P0noCD2n00RXOc7lTx');
    const elements = this.stripe.elements();

    this.userSubscription = this.userService.userActualSubject.subscribe(
      (data:any)=> {
        this.user = data.fullname;
        this.purchase = {
          "customer": this.user,
          "product": this.title
        }
        
      }
    );
    this.userService.getActualUser();
    this.purchase = {
      "customer": this.user,
      "product": this.title
    }

    setTimeout(() => {
      this.card = elements.create('card', {
        style: {
          base: {
            iconColor: '#FFF',
            color: '#FFF',
            ':-webkit-autofill': {
              color: '#fce883',
            },
          }
        }
      });
      this.card.mount(this.cardElement.nativeElement);
  
      this.card.addEventListener('change', ({ error }) => {
        this.cardErrors = error && error.message;
      });

    }, 500);

  }

  async handleForm(e) {
    e.preventDefault();
    const { source, error } = await this.stripe.createSource(this.card);
    if (error) {
      const cardErrors = error.message;
    } else {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;  
        if(this.direction == 'sub') {
          this.movieService.subscribeOnMovie();
          this.router.navigate([`subscribed`])
          console.warn('abonnement');
        }
        else {
          this.movieService.purchaseMovieById(+this.id)
          this.router.navigate([`complete/${this.id}`])
          console.warn('achat');
        }
      }, 2000);
      
    }
  }

  onClear() {
    this.isCheckChange.emit(false);

  }


}
