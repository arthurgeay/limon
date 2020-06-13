import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.scss']
})
export class DoneComponent implements OnInit {

  public isComplete: boolean;
  public id: number;
  public name: string;
  public movieSubscription: Subscription;
  public isConfirm: boolean = false;

  constructor(private route:ActivatedRoute,
              private movieService: MovieService) { }

  ngOnInit(): void {
    const route = this.route.snapshot.routeConfig.path;
    this.id = Number(this.route.snapshot.params['id']);  // get id from url
    this.isComplete = route.includes('complete');

    // if the route is for download a movie
    if (this.isComplete) {
      this.movieSubscription = this.movieService.movieSubject.subscribe(
        (movie:any)=>{
          this.name = movie.movie[0].title;
        }
      );
      this.movieService.getMovieById(+this.id);
    }
    this.isConfirm = true;
    setTimeout(() => {
      this.isConfirm = false; //hide animation
    }, 2500);
  }

  /**
   * method: void
   *    downlaoad a movie by his id
   */
  onDl():void {
    this.movieService.downloadMovieById(this.id, this.name);
  }

}
