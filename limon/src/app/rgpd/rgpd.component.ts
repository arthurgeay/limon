import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-rgpd',
  templateUrl: './rgpd.component.html',
  styleUrls: ['./rgpd.component.scss']
})
export class RgpdComponent implements OnInit {

  @Input() public isRGPD:boolean;
  @Output() public isRGPDChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * method: void
   *    hide the popup
   */
  onClear():void {
    this.isRGPDChange.emit(false);
  }

  
  /**
   * method: void
   *    store the answer of the user
   */
  onValid():void {
    localStorage.setItem('rgpd', 'ok');
  }

  
  /**
   * method: void
   *    go to google if user decline
   */
  onDenied():void {
    window.location.href = 'https://google.fr';
  }
  
}
