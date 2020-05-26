import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {

  public isCheck: boolean = false;
  public amount:number = 5;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  buy() {
    this.isCheck = !this.isCheck ;
  }
}
