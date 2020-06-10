import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  isHistory: boolean;
  isWatch: boolean;
  isPurchase: boolean;
  isEmpty: boolean = false;
  public catalog: any;
  id: number;

  constructor(private route:ActivatedRoute,
    private movieService:MovieService,
    private http:HttpClient) { }

  ngOnInit(): void {
    const route = this.route.snapshot.routeConfig.path;
    // @ts-ignore
    this.id = this.route.queryParams._value.userId == undefined ? 0 : Number(this.route.queryParams._value.userId);
    this.isHistory = route === 'history' ? true : false;
    this.isWatch = route === 'watchlist' ? true : false;
    this.isPurchase = route.includes('purchase') ? true : false;

    if (this.isHistory) {
      this.displayHistory();
    } 
    else if (this.isWatch) {
      this.displayWatchlist();
    }
    else if (this.isPurchase) {
      if (this.id == 0) {
        this.displayPurchase();
      }
      else {
        this.displaySpecificPurchase();
      }
    }

  }



  displayHistory() {
    this.http.get(`https://api-limon.app-tricycle.com/api/user/movies-watched`)
    .subscribe(
      (data:any)=>{
        this.catalog = data;  
        this.isEmpty = data.empty === true ? true : false;
      },
      (error)=>{
        console.log(error);
      }
    )
  }


  displayWatchlist() {
    this.http.get(`https://api-limon.app-tricycle.com/api/watchlist/`)
    .subscribe(
      (data:any)=>{
        this.catalog = data; 
        this.isEmpty = data.empty === true ? true : false;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  displayPurchase() {
    this.http.get(`https://api-limon.app-tricycle.com/api/user/movies-purchased`)
    .subscribe(
      (data:any)=>{
        this.catalog = data;      
        this.isEmpty = data.empty === true ? true : false;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  displaySpecificPurchase() {
    this.http.get(`https://api-limon.app-tricycle.com/api/user/movies-purchased?userId=${this.id}`)
    .subscribe(
      (data:any)=>{
        this.catalog = data;      
        this.isEmpty = data.empty === true ? true : false;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

}
