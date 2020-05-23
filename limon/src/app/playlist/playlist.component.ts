import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  isHistory: boolean;
  isWatch: boolean;
  isPurchase: boolean;
  catalog: any[];
  isEmpty: boolean = false;

  constructor(private route:ActivatedRoute,
    private movieService:MovieService) { }

  ngOnInit(): void {
    const route = this.route.snapshot.routeConfig.path;
    this.isHistory = route === 'history' ? true : false;
    this.isWatch = route === 'watchlist' ? true : false;
    this.isPurchase = route === 'purchase' ? true : false;
    this.catalog = this.movieService.catalog;
  }

}
