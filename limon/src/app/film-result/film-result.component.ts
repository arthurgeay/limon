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

  public isEmpty: boolean;
  public isSearch: boolean;
  public isAlph = false;
  public isPrice = false;
  public isDate = false;
  public moviesSubscription: Subscription;
  public movies: any;
  public resMovies: any;
  public currentPage:any;
  public totalPage:any;
  public isCateg:boolean;
  public cat:any;

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
          this.cat = cat;
          this.isSearch = true;
          this.onSearchCategroy();
        }
      );
      activeSearchService.pageEvent.subscribe(
        (data)=>{
          const page = data;
          this.onDisplayResultPage(page);
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
        this.totalPage = data.nb_pages;
        this.isEmpty = data.status === 'Aucun film trouvé' ? true : false;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  onDisplayResultPage(page) {
    if (this.isCateg) {
      page = page + '&searchBy=category&category_name=' + this.cat;
      this.value = ''
    }
    this.http.get(`https://api-limon.app-tricycle.com/api/movie/search?query=${this.value}&page=${page}`)
    .subscribe(
      (data:any)=>{
        this.resMovies = data.movies;  
        this.currentPage = data.current_page
        this.totalPage = data.nb_pages;
        this.isEmpty = data.status === 'Aucun film trouvé' ? true : false;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  onSearchCategroy() {
    if (this.value == undefined) { this.value = '' }
    this.http.get(`https://api-limon.app-tricycle.com/api/movie/search?query=${this.value}&searchBy=category&category_name=${this.cat}`)
    .subscribe(
      (data:any)=>{
        this.resMovies = data.movies;  
        this.currentPage = data.current_page
        this.totalPage = data.nb_pages;
        this.isCateg = true;
        this.isEmpty = data.status === 'Aucun film trouvé' ? true : false;
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
    if (this.value == undefined) {
      this.value = '';
    }
    if (this.isCateg) {
      if (!this.isAlph) {
        this.http.get(`https://api-limon.app-tricycle.com/api/movie/search?query=${this.value}&searchBy=category&category_name=${this.cat}&orderBy=asc`)
        .subscribe(
          (data:any)=>{
            this.resMovies = data.movies;
          },
          (error)=>{
            console.log(error);
          }
        )
      } else {
        this.http.get(`https://api-limon.app-tricycle.com/api/movie/search?query=${this.value}&searchBy=category&category_name=${this.cat}&orderBy=desc`)
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
    else {
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
  }

  onPrice() {
    return(this.isPrice = !this.isPrice)
  }

  onSortPrice() {
    if (this.value == undefined) {
      this.value = '';
    }
    if (this.isCateg) {
      if (!this.isPrice) {
        this.http.get(`https://api-limon.app-tricycle.com/api/movie/search?query=${this.value}&searchBy=category&category_name=${this.cat}&orderBy=price-asc`)
        .subscribe(
          (data:any)=>{
            this.resMovies = data.movies;       
          },
          (error)=>{
            console.log(error);
          }
        )
      } else {
        this.http.get(`https://api-limon.app-tricycle.com/api/movie/search?query=${this.value}&searchBy=category&category_name=${this.cat}&orderBy=price-desc`)
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
    else {
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
  }


  onDate() {
    return(this.isDate = !this.isDate)
  }

  onSortDate() {
    if (this.value == undefined) {
      this.value = '';
    }
    if (this.isCateg) {
      if (!this.isDate) {
        this.http.get(`https://api-limon.app-tricycle.com/api/movie/search?query=${this.value}&searchBy=category&category_name=${this.cat}&orderBy=date-asc`)
        .subscribe(
          (data:any)=>{
            this.resMovies = data.movies;       
          },
          (error)=>{
            console.log(error);
          }
        )
      } else {
        this.http.get(`https://api-limon.app-tricycle.com/api/movie/search?query=${this.value}&searchBy=category&category_name=${this.cat}&orderBy=date-desc`)
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
    else {
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
