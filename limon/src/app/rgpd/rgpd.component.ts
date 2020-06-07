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

  onClear(action) {
    this.isRGPDChange.emit(false);

    if(action == 'valid') {
      localStorage.setItem('rgpd', 'ok');
    } else {
      window.location.href = 'https://google.fr';
    }
  }
  
}
