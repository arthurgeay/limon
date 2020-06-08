import { Component, OnInit, Input, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActiveSearchService } from '../active-search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  @Input() isAuth:boolean;
  @ViewChild('search') search: ElementRef;
  public isSearch:boolean = false;
  
  constructor(private http:HttpClient,
    private router:Router,
    private activeSearchService: ActiveSearchService) { }

  ngOnInit(): void {
  
  }

  OnSearch() {
    this.isSearch = true;
    const value = this.search.nativeElement.value || 'a';
    this.router.navigate(['/']);
    this.activeSearchService.onSearchEvent.emit(true);
    this.activeSearchService.DataIDEvent.emit(value);
    setTimeout(() => {
      this.activeSearchService.onSearchEvent.emit(true);
      this.activeSearchService.DataIDEvent.emit(value);
    }, 100);
  }

  onCancelSearch() {
    this.isSearch = false;
    this.search.nativeElement.value = '';
    this.activeSearchService.onSearchEvent.emit(false);

  }

}
