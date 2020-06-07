import { Component, OnInit, HostListener, NgZone } from '@angular/core';
import { MobileService } from '../mobile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveSearchService } from '../active-search.service';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { Md5 } from 'ts-md5';

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
  public mail: string;
  authSubscription: Subscription;
  premiumSubscription: Subscription;
  actualUserSubscription: Subscription;


  constructor(private mobileService:MobileService,
    private activeSearchService:ActiveSearchService,
    private authService:AuthService,
    public zone:NgZone,
    private userService:UserService) { }

  ngOnInit(): void {
    this.isMobile = this.mobileService.isMobile;//prendre le ismobile du service  
    this.isAuth = this.authService.isAuth();
    this.isSub = this.authService.isPremium();
    this.authSubscription = this.authService.authSubject.subscribe(
      (data:any)=>{
        this.isAuth = data;
      }
    );
    this.premiumSubscription = this.authService.premiumSubject.subscribe(
      (data:any)=>{
        this.isSub = data;
      }
    );

    this.actualUserSubscription = this.userService.userActualSubject.subscribe(
      (data:any)=>{
        const md5 = new Md5();
        this.mail = md5.appendStr(data.email).end().toString();
      }
    );
    this.userService.getActualUser();

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
