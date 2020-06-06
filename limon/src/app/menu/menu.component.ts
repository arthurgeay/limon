import { Component, OnInit, HostListener } from '@angular/core';
import { MobileService } from '../mobile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveSearchService } from '../active-search.service';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  isAuth:boolean;
  isSub:boolean;
  public isMobile = false;
  public isMenu = false;
  authSubscription: Subscription;
  premiumSubscription: Subscription;
  constructor(private mobileService:MobileService,
    private activeSearchService:ActiveSearchService,
    private authService:AuthService) { }

  ngOnInit(): void {
    this.isMobile = this.mobileService.isMobile;//prendre le ismobile du service  

    this.authSubscription = this.authService.authSubject.subscribe(
      (data:any)=>{
        this.isAuth = data;
        console.log(data);
        
      }
    );
    // this.premiumSubscription = this.authService.premiumSubject.subscribe(
    //   (data:any)=>{
    //     this.isSub = data;
    //     console.log(data);
    //   }
    // );

  }

  onAppear() {
    this.isMenu = !this.isMenu;
  }
  onMenuOpen(){
    return(this.isMenu ? 'translateY(0rem)' : 'translateY(-15rem)')
  }
  onReset(){
    this.activeSearchService.onSearchEvent.emit(false);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = this.mobileService.getIsMobile(); //detect changes of viewport
  }

}