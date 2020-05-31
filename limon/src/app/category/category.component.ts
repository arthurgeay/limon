import { Component, OnInit } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActiveSearchService } from '../active-search.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  public isCatChoose = false;
  public categoriesSubject = new Subject<any[]>();
  public categories: any;
  // public categories = [
  //   'Animation',
  //   'Aventure',
  //   'Comédie',
  //   'Enquêtes',
  //   'Fantaisie',
  //   'Guerre',
  //   'Historique',
  //   'Horreur',
  //   'Polar',
  //   'Science Fiction',
  //   'Super-Héros',
  //   'Vie Quotidienne'];
  constructor(private http:HttpClient,
    private activeSearchService:ActiveSearchService) { }

  ngOnInit(): void {
    this.http.get(`https://api-limon.app-tricycle.com/api/category/all`)
    .subscribe(
      (data:any)=>{
        this.categories = data;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  onSearch(name) {
    this.activeSearchService.categoryEvent.emit(name);
  }

  onCatChoose()  {
    this.isCatChoose = !this.isCatChoose;
  }
}
