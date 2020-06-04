import { Component, OnInit, Input } from '@angular/core';
import { PlaylistComponent } from '../playlist/playlist.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
  public isBuy:boolean = false;

  constructor(private playlistComponent:PlaylistComponent,
    private router:Router,
    private http:HttpClient) { }

  ngOnInit(): void {
    console.log(this.alr_buy);
    if (this.alr_buy == 1) {
      this.isBuy = true;
    }
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

  onBill(id:number) {
    this.http.get(`https://api-limon.app-tricycle.com/api/purchase/invoice/${id}`)
    .subscribe(
      (data:any)=>{
        console.log(data);
      },
      (error)=>{
        console.log(error);
      }
    )
  }

}
