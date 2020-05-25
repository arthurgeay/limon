import { Component, OnInit, HostListener } from '@angular/core';
import { MobileService } from '../mobile.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  isAuth:boolean = true;
  isSub:boolean = true;
  public isMobile = false;
  public isMenu = false;
  constructor(private mobileService:MobileService) { }

  ngOnInit(): void {
    this.isMobile = this.mobileService.isMobile;//prendre le ismobile du service  
  }

  onAppear() {
    this.isMenu = !this.isMenu;
  }
  onMenuOpen(){
    return(this.isMenu ? 'translateY(0rem)' : 'translateY(-15rem)')
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = this.mobileService.getIsMobile(); //detect changes of viewport
  }

}
