import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {

  public isCheck: boolean = false;
  public amount:number = 46.99;
  public direction:string = "sub";

  constructor(private router:Router, private http:HttpClient) { }

  ngOnInit(): void {
  }

  
  /**
   * method: void
   *    display/hide the popup
   */
  buy():void {
    this.isCheck = !this.isCheck;
  }
}
