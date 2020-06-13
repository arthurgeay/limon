import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { Md5 } from 'ts-md5';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  @Input() reviews:any;
  public path: string;
  public isModal: boolean;
  public isAuth: boolean;
  public isAdmin: boolean;
  public isActual:boolean;
  public actualUserSubscription: Subscription;
  public mail: string;

  constructor(private userService:UserService,
              private authService:AuthService,
              private route: ActivatedRoute,
              private movieService:MovieService) { }

  ngOnInit(): void {
    // @ts-ignore
    this.path = this.route.snapshot._routerState.url;

    // determines type of user
    this.isAuth = this.authService.isAuth();
    this.isAdmin = this.authService.isAdmin();

    // determines if the actual user
    if (this.isAuth) {
      this.isActual = this.userService.actualUser.id === this.reviews.user.id ? true : false;
    }

    // encode to Md5 for gravatar
    const md5 = new Md5();
    this.mail = md5.appendStr(this.reviews.user.email).end().toString();
  }

  /**
   * method:void
   * @param id :number
   *    send the content of the review
   */
  onEdit(id:number):void {
    this.movieService.EditReview(
      {
        "id": id,
        "content": this.reviews.content
      });
  }

  /**
   * method: void
   *    display/hide the delete popup
   */
  swapModal():void {
    this.isModal = !this.isModal;
  }

}
