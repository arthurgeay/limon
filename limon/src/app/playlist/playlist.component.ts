import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  
  public isHistory: boolean;
  public isWatch: boolean;
  public isPurchase: boolean;
  public isEmpty: boolean = false;
  public catalog: any[];
  public id: number;

  constructor(private route:ActivatedRoute,
              private http:HttpClient) { }

  ngOnInit(): void {
    const route = this.route.snapshot.routeConfig.path;
    // @ts-ignore
    this.id = this.route.queryParams._value.userId == undefined ? 0 : Number(this.route.queryParams._value.userId);
    
    // determines which page is asked
    this.isHistory = route === 'history' ? true : false;
    this.isWatch = route === 'watchlist' ? true : false;
    this.isPurchase = route.includes('purchase') ? true : false;

    //display information depending of the route
    if (this.isHistory) {
      this.displayHistory();
    } 
    else if (this.isWatch) {
      this.displayWatchlist();
    }
    else if (this.isPurchase) {
      //if it's a specific user purchase list
      if (this.id == 0) {
        this.displayPurchase();
      }
      else {
        this.displaySpecificPurchase();
      }
    }

  }


/**
 * method:void
 *    display history of the user
 */
  displayHistory():void {
    this.http.get(`https://api-limon.app-tricycle.com/api/user/movies-watched`)
    .subscribe(
      (data:any)=>{
        if (data.empty === true) {
          this.isEmpty = true;
        }
        else {
          this.isEmpty = false;
          this.catalog = data;  
        }
        console.log(data);
      },
      (error)=>{
        console.log(error);
      }
    )
  }

/**
 * method:void
 *    display the watchlist of the user
 */
  displayWatchlist():void {
    this.http.get(`https://api-limon.app-tricycle.com/api/watchlist/`)
    .subscribe(
      (data:any)=>{
        if (data.empty === true) {
          this.isEmpty = true;
        }
        else {
          this.isEmpty = false;
          this.catalog = data;  
        }
        console.log(data);
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  /**
 * method:void
 *    display purchase list of the actual user
 */
  displayPurchase():void {
    this.http.get(`https://api-limon.app-tricycle.com/api/user/movies-purchased`)
    .subscribe(
      (data:any)=>{
        if (data.empty === true) {
          this.isEmpty = true;
        }
        else {
          this.isEmpty = false;
          this.catalog = data;  
        }
        console.log(data);
      },
      (error)=>{
        console.log(error);
      }
    )
  }


/**
 * method:void
 *    display purchase list of a specific user
 */
  displaySpecificPurchase():void {
    this.http.get(`https://api-limon.app-tricycle.com/api/user/movies-purchased?userId=${this.id}`)
    .subscribe(
      (data:any)=>{
        if (data.empty === true) {
          this.isEmpty = true;
        }
        else {
          this.isEmpty = false;
          this.catalog = data;  
        }
        console.log(data);
      },
      (error)=>{
        console.log(error);
      }
    )
  }

}
