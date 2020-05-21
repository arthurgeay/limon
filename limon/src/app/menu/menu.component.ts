import { Component, OnInit, HostListener } from '@angular/core';
import { MobileService } from '../mobile.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public isMobile = false;
  public isMenu = false;
  constructor(private mobileService:MobileService) { }

  ngOnInit(): void {
    this.isMobile = this.mobileService.isMobile;//prendre le ismobile du service
    // window.onresize = () => this.isMobile = window.innerWidth <= 665; //detection du resize et passage à true selon la condition
  }

  onAppear() {
    this.isMenu = !this.isMenu;
  }
  onMenuOpen(){
    return(this.isMenu ? 'translateY(0rem)' : 'translateY(-12rem)')
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = this.mobileService.getIsMobile(); //detect changes of viewport
  }

}
