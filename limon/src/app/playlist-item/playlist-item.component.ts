import { Component, OnInit, Input } from '@angular/core';
import { PlaylistComponent } from '../playlist/playlist.component';

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

  constructor(private playlistComponent:PlaylistComponent) { }

  ngOnInit(): void {

  }

}
