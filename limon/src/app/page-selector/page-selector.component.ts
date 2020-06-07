import { Component, OnInit, Input } from '@angular/core';
import { ActiveSearchService } from '../active-search.service';

@Component({
  selector: 'app-page-selector',
  templateUrl: './page-selector.component.html',
  styleUrls: ['./page-selector.component.scss']
})
export class PageSelectorComponent implements OnInit {

  @Input() public current:any;
  @Input() public total:any;
  public newPage:number;
  
  constructor(private activeService:ActiveSearchService) { }

  ngOnInit(): void {
  }

  next() {
    this.newPage = Number(this.current) + 1;
    this.activeService.pageEvent.emit(this.newPage);
  }

  previous() {
    this.newPage = Number(this.current) - 1;
    this.activeService.pageEvent.emit(this.newPage);
  }

}
