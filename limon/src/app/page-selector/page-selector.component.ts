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

  /**
   * method:void
   *    increment by 1 the page number
   */
  next():void {
    this.newPage = Number(this.current) + 1;
    this.activeService.pageEvent.emit(this.newPage);
  }


  /**
   * method:void
   *    decrement by 1 the page number
   */
  previous():void {
    this.newPage = Number(this.current) - 1;
    this.activeService.pageEvent.emit(this.newPage);
  }

}
