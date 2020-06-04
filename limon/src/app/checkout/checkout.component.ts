import { Component, OnInit, AfterContentInit, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../movie.service';

declare var Stripe;//: stripe.StripeStatic;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  @Input() public amount:number;
  @Input() public id:number;
  @Input() public direction:string;
  @Input() public isCheck: boolean;
  @Output() public isCheckChange = new EventEmitter<boolean>();
  @ViewChild('cardElement', {static: false}) cardElement: ElementRef;
  stripe;
  card;
  cardErrors;
  loading = false;

  constructor(private router:Router,
    private movieService:MovieService) { }

  ngOnInit(): void {
    this.stripe = Stripe('pk_test_DeZzMPNpBYMz6rr8P0noCD2n00RXOc7lTx');
    const elements = this.stripe.elements();

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
        this.movieService.purchaseMovieById(+this.id)
        if(this.direction == 'sub') {
          this.router.navigate([`subscribed`])
        }
        else {
          this.router.navigate([`complete/${this.id}`])
        }
      }, 2000);
      
    }
  }

  onClear() {
    this.isCheckChange.emit(false);

  }


}
