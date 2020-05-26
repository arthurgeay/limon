import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


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

  onClear() {
    this.isRGPDChange.emit(false);
  }
  
}
