import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

    // Stripe
    pay(amount) {    
 
      var handler = (<any>window).StripeCheckout.configure({
        key: 'pk_test_DeZzMPNpBYMz6rr8P0noCD2n00RXOc7lTx',
        locale: 'auto',
        token: ()=> { this.redirecTo() }
      });
   
      handler.open({
        name: 'Limon',
        description: 'Paiement sécurisé avec Stripe',
        amount: amount * 100
      });
   
    }
  
    redirecTo() {
      this.router.navigate(['subscribed']);
    }
}
