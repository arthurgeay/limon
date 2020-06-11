import { Component, OnInit } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActiveSearchService } from '../active-search.service';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  public categoriesSubject = new Subject<any[]>();
  public categories: any;
  public categorySubscription: Subscription;
  
  constructor(
    private activeSearchService:ActiveSearchService,
    private movieService:MovieService) { }

  ngOnInit(): void {
    // retrieve all category names
    this.categorySubscription = this.movieService.categorySubject.subscribe(
      (data:any)=>{
        this.categories = data;
      }
    );
    this.movieService.getAllCategories();
  }

  /* 
  * method: void / params: string
  *   send the actual category to search
  */
  onSearch(name: string):void {
    this.activeSearchService.categoryEvent.emit(name);
  }

}
