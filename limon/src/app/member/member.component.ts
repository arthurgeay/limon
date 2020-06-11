import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {

  @Input() user;
  public userID: any;
  public mail: string | Int32Array;
  public path:string;
  public isModal:boolean;


  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    // @ts-ignore
    this.path = this.route.snapshot._routerState.url;
    this.userID = this.user.id;

    //transform user's mail in Md5 to use with gravatar
    const md5 = new Md5();
    this.mail = md5.appendStr(this.user.email).end();
  }



  /**
   * method: void
   *    display/hide the delete popup
   */
  swapModal():void {
    this.isModal = !this.isModal;
  }

}
