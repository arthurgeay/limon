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
  public direction:string = "buy";
  public isCheck = false;
  public isBuy:boolean = false;

  constructor(
    private playlistComponent:PlaylistComponent,
    private router:Router,
    private http:HttpClient,
    private movieService:MovieService) { }

  ngOnInit(): void {
    console.log(this.alr_buy);
    if (this.alr_buy == 1) {
      this.isBuy = true;
    }
    console.log(this.item);
  }

  onDl(id:number) {
    this.movieService.downloadMovieById(id,this.item.title);
  }

  buy() {
    this.isCheck = !this.isCheck;
  }


  onDelete(id:number) {
    this.http.delete(`https://api-limon.app-tricycle.com/api/watchlist/${id}`)
    .subscribe(
      (data:any)=>{
        console.log(data);
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['watchlist']);
      }); 
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  onBill() {
    let mediaType = 'application/json';
    this.http.get(`https://api-limon.app-tricycle.com/api/purchase/invoice/${this.idBuy}`, { responseType: 'blob' })
    .subscribe(
      (data:any)=>{
        let blob = new Blob([data], { type:mediaType})
        console.log(blob);
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
        console.log(error);
      }
    )
  }
}
