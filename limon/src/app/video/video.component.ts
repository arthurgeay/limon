import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  @Input() isView:boolean;
  @Output() isViewChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  onExit() {
    this.isViewChange.emit(false);
  }
}
