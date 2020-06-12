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
  public scrollToLeft1 = false;
  public scrollToRight1 = true;
  public scrollToLeft2 = false;
  public scrollToRight2 = true;
  public value: any;


  constructor(private activeSearchService:ActiveSearchService,
              private movieService: MovieService,
              private mobileService:MobileService,
              private http:HttpClient,) { 
        // get if user search or not
        activeSearchService.onSearchEvent.subscribe(
          (response)=>{
            this.isSearch = response;
          }
        );

        // get the value write in the searchbar
        activeSearchService.DataIDEvent.subscribe(
          (data)=>{
            this.value = data;
            this.onDisplayResult();
          }
        );

        // get the category choosen
        activeSearchService.categoryEvent.subscribe(
          (cat)=>{
            this.cat = cat;
            this.isSearch = true;
            this.onSearchCategroy();
          }
        );

        // get the current page number
        activeSearchService.pageEvent.subscribe(
          (data)=>{
            const page = data.toString();
            this.onDisplayResultPage(page);
          }
        );
    }

  ngOnInit(): void {
    // display/hide RGPD popup if the user already answer
    if (localStorage.getItem('rgpd') === 'ok') {
      this.isRGPD = false;
    } else {
      this.isRGPD = true;
    }

    // get movies for first page (new and popular sections)
    this.moviesSubscription = this.movieService.moviesSubject.subscribe(
      (movie:any)=>{
        this.movies = movie;
      }
    );
    this.movieService.getAllMovies();

    this.isMobile = this.mobileService.isMobile; //know if app is in mobile mode
  }


  /**
   * method:void
   *    display result of a simple search with only the value in the searchbar
   */
  onDisplayResult():void {
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


  /**
   * method:void / params: string
   *    display result of a search with a page in the query
   */
  onDisplayResultPage(page:string):void {
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


  /**
   * method:void
   *         display result of a simple search with only the value in the searchbar and the choosen category
   */
  onSearchCategroy():void {
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


  /**
   * method:boolean
   *    change between ascendent and descendent in alphabetical order
   */
  onAlph():boolean {
    return(this.isAlph = !this.isAlph)
  }


  /**
   * method:void
   *    sorting result by alphabetical order
   */
  onSortAlph():void {
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


  /**
   * method:boolean
   *    change between ascendent and descendent, sort by price
   */
  onPrice():boolean {
    return(this.isPrice = !this.isPrice)
  }


  /**
   * method:void
   *    sorting result by price
   */
  onSortPrice():void {
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


  /**
   * method:boolean
   *    change between ascendent and descendent depending of the release date
   */
  onDate():boolean {
    return(this.isDate = !this.isDate)
  }


  /**
   * method:void
   *    sorting result by relese date
   */
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

/**
 * method: void
 *      bring at the start of the container
 */
  scroll1Start():void {
    this.scroll1.nativeElement.scrollLeft -= this.scroll1.nativeElement.clientWidth;
  }

  scroll2Start():void {
    this.scroll2.nativeElement.scrollLeft -= this.scroll2.nativeElement.clientWidth;
  }



  /**
   * method: void
   *      bring at the end of the container
   */
  scroll1End():void {
    this.scroll1.nativeElement.scrollLeft += this.scroll1.nativeElement.clientWidth;
  }

  scroll2End():void {
    this.scroll2.nativeElement.scrollLeft += this.scroll2.nativeElement.clientWidth;
  }



  /**
   * method: void / params: Event
   *      change states of booleans to manage moving inside containers
   */
  onScroll1(event:Event):void {
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


  /**
   * method: void / params: Event
   *      change states of booleans to manage moving inside containers
   */
  onScroll2(event:Event):void {
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


  /**
   * method:void
   *    see if the app is running on mobile
   */
  @HostListener('window:resize', ['$event'])
  onResize():void {
    this.isMobile = this.mobileService.getIsMobile(); //detect changes of viewport
  }
}
