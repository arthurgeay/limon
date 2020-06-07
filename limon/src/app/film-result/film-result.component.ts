import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { MovieService } from '../movie.service';
import { MobileService } from '../mobile.service';
import { Observable, Subscription } from 'rxjs';
import { ActiveSearchService } from '../active-search.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-film-result',
  templateUrl: './film-result.component.html',
  styleUrls: ['./film-result.component.scss']
})
export class FilmResultComponent implements OnInit {

  public isEmpty: boolean = false;
  public isSearch: boolean = false;
  public isAlph = false;
  public isPrice = false;
  public isDate = false;
  public moviesSubscription: Subscription;
  public movies: any;
  public resMovies: any;
  public currentPage:any;
  public totalPage:any;

  public isMobile: boolean = false;
  public isRGPD:boolean;
  @ViewChild('scroll1', { read: ElementRef }) public scroll1: ElementRef<any>;
  @ViewChild('scroll2', { read: ElementRef }) public scroll2: ElementRef<any>;
  scrollToLeft1 = false;
  scrollToRight1 = true;
  scrollToLeft2 = false;
  scrollToRight2 = true;
  value: any;


  constructor(
    private http:HttpClient,
    private movieService: MovieService,
    private mobileService:MobileService,
    private activeSearchService:ActiveSearchService) { 
      activeSearchService.onSearchEvent.subscribe(
        (response)=>{
          this.isSearch = response;
        }
      );
      activeSearchService.DataIDEvent.subscribe(
        (data)=>{
          this.value = data;
          this.onDisplayResult();
        }
      );
      activeSearchService.categoryEvent.subscribe(
        (cat)=>{
          const categ = cat;
          this.isSearch = true;
          this.onSearchCategroy(categ);
        }
      );
    }

  ngOnInit(): void {
    if (localStorage.getItem('rgpd') === 'ok') {
      this.isRGPD = false;
    } else {
      this.isRGPD = true;
    }
    this.moviesSubscription = this.movieService.moviesSubject.subscribe(
      (movie:any)=>{
        this.movies = movie;
      }
    );
    
    this.movieService.getAllMovies();
    this.isMobile = this.mobileService.isMobile;//prendre le ismobile du service 

  }

  onDisplayResult() {
    this.http.get(`https://api-limon.app-tricycle.com/api/movie/search?query=${this.value}`)
    .subscribe(
      (data:any)=>{
        this.resMovies = data.movies;  
        this.currentPage = data.current_page
        this.isEmpty = data.status === 'Aucun film trouvé' ? true : false;
        console.group()
        console.log(data);
        console.log(this.currentPage);
        console.groupEnd()
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  onSearchCategroy(cat) {
    this.http.get(`https://api-limon.app-tricycle.com/api/movie/search?query=&searchBy=category&category_name=${cat}`)
    .subscribe(
      (data:any)=>{
        this.resMovies = data.movies;       
      },
      (error)=>{
        console.log(error);
      }
    )
  }


  onAlph() {
    return(this.isAlph = !this.isAlph)
  }

  onSortAlph() {
    if (!this.isAlph) {
      this.onDisplayResult();
    } else {
      this.http.get(`https://api-limon.app-tricycle.com/api/movie/search?query=${this.value}&orderBy=desc`)
      .subscribe(
        (data:any)=>{
          this.resMovies = data.movies;       
        },
        (error)=>{
          console.log(error);
        }
      )
    }
  }

  onPrice() {
    return(this.isPrice = !this.isPrice)
  }

  onSortPrice() {
    if (!this.isPrice) {
      this.http.get(`https://api-limon.app-tricycle.com/api/movie/search?query=${this.value}&orderBy=price-asc`)
      .subscribe(
        (data:any)=>{
          this.resMovies = data.movies;       
        },
        (error)=>{
          console.log(error);
        }
      )
    } else {
      this.http.get(`https://api-limon.app-tricycle.com/api/movie/search?query=${this.value}&orderBy=price-desc`)
      .subscribe(
        (data:any)=>{
          this.resMovies = data.movies;       
        },
        (error)=>{
          console.log(error);
        }
      )
    }
  }
  onDate() {
    return(this.isDate = !this.isDate)
  }

  onSortDate() {
    if (!this.isDate) {
      this.http.get(`https://api-limon.app-tricycle.com/api/movie/search?query=${this.value}&orderBy=date-asc`)
      .subscribe(
        (data:any)=>{
          this.resMovies = data.movies;       
        },
        (error)=>{
          console.log(error);
        }
      )
    } else {
      this.http.get(`https://api-limon.app-tricycle.com/api/movie/search?query=${this.value}&orderBy=date-desc`)
      .subscribe(
        (data:any)=>{
          this.resMovies = data.movies;       
        },
        (error)=>{
          console.log(error);
        }
      )
    }
  }


  scroll1Start() {
    this.scroll1.nativeElement.scrollLeft -= this.scroll1.nativeElement.clientWidth;
  }

  scroll2Start() {
    this.scroll2.nativeElement.scrollLeft -= this.scroll2.nativeElement.clientWidth;
  }

  scroll1End() {
    this.scroll1.nativeElement.scrollLeft += this.scroll1.nativeElement.clientWidth;
  }

  scroll2End() {
    this.scroll2.nativeElement.scrollLeft += this.scroll2.nativeElement.clientWidth;
  }

  onScroll1(event:Event) {
    //@ts-ignore
    if (event.srcElement.scrollLeft >= 100) {
      this.scrollToLeft1 = true;
    }
    else {
      this.scrollToLeft1 = false;
    }
    //@ts-ignore
    if (event.srcElement.scrollLeft >= this.scroll1.nativeElement.clientWidth / 10) {
      this.scrollToRight1 = false;
    } 
    else {
      this.scrollToRight1 = true;
    }
  } 

  onScroll2(event:Event) {
    //@ts-ignore
    if (event.srcElement.scrollLeft >= 100) {
      this.scrollToLeft2 = true;
    }
    else {
      this.scrollToLeft2 = false;
    }
  //@ts-ignore
    if (event.srcElement.scrollLeft >= this.scroll2.nativeElement.clientWidth / 10) {
      this.scrollToRight2 = false;
    }
    else {
      this.scrollToRight2 = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = this.mobileService.getIsMobile(); //detect changes of viewport
  }
}
