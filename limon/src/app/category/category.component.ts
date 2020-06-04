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
  public isCatChoose = false;
  public categoriesSubject = new Subject<any[]>();
  public categories: any;
  categorySubscription: Subscription;
  
  constructor(private http:HttpClient,
    private activeSearchService:ActiveSearchService,
    private movieService:MovieService) { }

  ngOnInit(): void {
    this.categorySubscription = this.movieService.categorySubject.subscribe(
      (data:any)=>{
        this.categories = data;
      }
    );
    this.movieService.getAllCategories();
  }

  onSearch(name) {
    this.activeSearchService.categoryEvent.emit(name);
  }

  onCatChoose()  {
    this.isCatChoose = !this.isCatChoose;
  }
}
