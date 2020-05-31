import { Component, OnInit, Input, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActiveSearchService } from '../active-search.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  @Input() isAuth:boolean;
  @ViewChild('search') search: ElementRef;
  
  constructor(private http:HttpClient,
    private activeSearchService: ActiveSearchService) { }

  ngOnInit(): void {
  
  }

  OnSearch() {
    const value = this.search.nativeElement.value || 'a';
    this.activeSearchService.onSearchEvent.emit(true);
    this.activeSearchService.DataIDEvent.emit(value);
  }

}
