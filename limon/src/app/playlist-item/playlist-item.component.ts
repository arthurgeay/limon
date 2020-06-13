import { Component, OnInit, Input } from '@angular/core';
import { PlaylistComponent } from '../playlist/playlist.component';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-playlist-item',
  templateUrl: './playlist-item.component.html',
  styleUrls: ['./playlist-item.component.scss']
})
export class PlaylistItemComponent implements OnInit {

  @Input() item: any;
  @Input() isHistory: boolean;
  @Input() isWatch: boolean;
  @Input() isPurchase: boolean;
  @Input() alr_buy:any;
  @Input() idBuy:any;
  @Input() date:any;
  public direction:string = "buy";
  public isCheck = false;
  public isBuy:boolean = false;

  constructor(private playlistComponent:PlaylistComponent,
              private router:Router,
              private http:HttpClient,
              private movieService:MovieService) { }

  ngOnInit(): void {
    //if the movie is already buy
    if (this.alr_buy == 1) {
      this.isBuy = true;
    }
  }

  /**
   * method: void / params:number
   *    download a movie by id
   */
  onDl(id:number):void {
    this.movieService.downloadMovieById(id,this.item.title);
  }


  /**
   * method:void
   *      display/hide the popup
   */
  buy() {
    this.isCheck = !this.isCheck;
  }

  /**
   * method: void
   * @param id:number
   *    delete a movie from the watchlist
   */
  onDelete(id:number):void {
    this.http.delete(`https://api-limon.app-tricycle.com/api/watchlist/${id}`)
    .subscribe(
      (data:any)=>{
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['watchlist']);
      }); 
      },
      (error)=>{
        // console.log(error);
      }
    )
  }


  /**
   * method:void
   *  download the bill
   */
  onBill():void {
    let mediaType = 'application/pdf';
    this.http.get(`https://api-limon.app-tricycle.com/api/purchase/invoice/${this.idBuy}`, { responseType: 'blob' })
    .subscribe(
      (data:any)=>{
        let blob = new Blob([data], { type:mediaType})
        const filename = 'facture.pdf';
        const url = window.URL.createObjectURL(blob);
        const a:HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      },
      (error)=>{
        // console.log(error);
      }
    )
  }
}
