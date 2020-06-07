import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-selector',
  templateUrl: './page-selector.component.html',
  styleUrls: ['./page-selector.component.scss']
})
export class PageSelectorComponent implements OnInit {

  @Input() public current:any;
  @Input() public total:any;
  public newPage:number;
  
  constructor() { }

  ngOnInit(): void {
  }

  next() {
    this.newPage = Number(this.current) + 1;

  }

  previous() {
    this.newPage = Number(this.current) - 1;
  }

}
