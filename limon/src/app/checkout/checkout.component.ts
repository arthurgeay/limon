import { Component, OnInit, AfterContentInit, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

declare var Stripe;//: stripe.StripeStatic;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  @Input() public amount:number;
  @Input() public isCheck: boolean;
  @Output() public isCheckChange = new EventEmitter<boolean>();
  @ViewChild('cardElement', {static: false}) cardElement: ElementRef;
  stripe;
  card;
  cardErrors;
  loading = false;

  constructor(private router:Router) { }

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
      // this.router.navigate(['complete'])
      setTimeout(() => {
        this.loading = false;  
      }, 2000);
      
    }
  }

  onClear() {
    this.isCheckChange.emit(false);

  }


}
