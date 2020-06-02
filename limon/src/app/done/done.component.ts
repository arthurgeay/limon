import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.scss']
})
export class DoneComponent implements OnInit {
  isComplete: boolean;
  id:any;

  constructor(private route:ActivatedRoute,
    private movieService: MovieService) { }

  ngOnInit(): void {
    const route = this.route.snapshot.routeConfig.path;
    this.id = this.route.snapshot.params['id'];  // get id from url
    this.isComplete = route.includes('complete');
  }

  onDl() {
    this.movieService.downloadMovieById(this.id);
  }

}
