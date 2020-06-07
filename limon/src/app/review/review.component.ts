import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../movie.service';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  @Input() reviews;
  public path: string;
  public isModal: boolean;
  public isAuth: boolean;
  public isAdmin: boolean;
  public isActual:boolean;

  constructor(private http: HttpClient,
    private userService:UserService,
    private authService:AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private movieService:MovieService) { }

  ngOnInit(): void {
    // @ts-ignore
    this.path = this.route.snapshot._routerState.url;
    this.isAuth = this.authService.isAuth();
    this.isAdmin = this.authService.isAdmin();
    if (this.isAuth) {
      this.isActual = this.userService.actualUser.id === this.reviews.user.id ? true : false;
    }
  }


  onEdit(id:number) {
    this.movieService.EditReview(
      {
        "id": id,
        "content": this.reviews.content
      });
  }

  swapModal() {
    this.isModal = !this.isModal;
  }

}
