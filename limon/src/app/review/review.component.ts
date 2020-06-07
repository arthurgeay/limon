import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../movie.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  @Input() reviews;
  public path: string;
  public isModal:boolean;

  constructor(private http: HttpClient,
    private userService:UserService,
    private route: ActivatedRoute,
    private router: Router,
    private movieService:MovieService) { }

  ngOnInit(): void {
    // @ts-ignore
    this.path = this.route.snapshot._routerState.url;

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
