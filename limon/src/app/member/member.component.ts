import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {

  @Input() user;
  userID: any;
  mail: string | Int32Array;
  path:string;
  public isModal:boolean;


  constructor(private http:HttpClient,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    // @ts-ignore
    this.path = this.route.snapshot._routerState.url;
    this.userID = this.user.id;
    const md5 = new Md5();
    this.mail = md5.appendStr(this.user.email).end();
  }

  swapModal() {
    this.isModal = !this.isModal;
  }

}
