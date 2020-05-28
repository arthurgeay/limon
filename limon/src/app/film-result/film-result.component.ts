import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { MovieService } from '../movie.service';
import { MobileService } from '../mobile.service';

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
  public catalog: any[];
  public isMobile: boolean = false;
  public isRGPD:boolean;
  @ViewChild('scroll1', { read: ElementRef }) public scroll1: ElementRef<any>;
  @ViewChild('scroll2', { read: ElementRef }) public scroll2: ElementRef<any>;
  scrollToLeft1 = false;
  scrollToRight1 = true;
  scrollToLeft2 = false;
  scrollToRight2 = true;


  constructor(private movieService: MovieService,
    private mobileService:MobileService) { }

  ngOnInit(): void {
    this.isRGPD = true;
    this.catalog = this.movieService.catalog;
    this.isMobile = this.mobileService.isMobile;//prendre le ismobile du service  
  }

  onAlph() {
    return(this.isAlph = !this.isAlph)
  }

  onPrice() {
    return(this.isPrice = !this.isPrice)
  }

  onDate() {
    return(this.isDate = !this.isDate)
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
    if (event.srcElement.scrollLeft >= 100) {
      this.scrollToLeft1 = true;
    }
    else {
      this.scrollToLeft1 = false;
    }

    if (event.srcElement.scrollLeft >= this.scroll1.nativeElement.clientWidth / 10) {
      this.scrollToRight1 = false;
    }
    else {
      this.scrollToRight1 = true;
    }
  }

  onScroll2(event:Event) {
    if (event.srcElement.scrollLeft >= 100) {
      this.scrollToLeft2 = true;
    }
    else {
      this.scrollToLeft2 = false;
    }

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
