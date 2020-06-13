import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  @Input() input:string;
  public isNote:boolean = false;
  public isSub:boolean = false;
  public isPurchase:boolean = false;

  constructor() { }

  ngOnInit(): void {
    if (this.input === "note") {
      this.isNote = true;
    } else if (this.input === "sub") {
      this.isSub = true;
    } else if (this.input === "purchase") {
      this.isPurchase = true;
    }
  }

}

