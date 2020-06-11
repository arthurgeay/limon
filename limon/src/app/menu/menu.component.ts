import { Component, OnInit, HostListener } from '@angular/core';
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
              private userService:UserService) { }

  ngOnInit(): void {
    this.isMobile = this.mobileService.isMobile;//prendre le ismobile du service  

    //determine which type of user is using the menu
    this.isAuth = this.authService.isAuth();
    this.isSub = this.authService.isPremium();

    // know if the user is authentified
    this.authSubscription = this.authService.authSubject.subscribe(
      (data:any)=>{
        this.isAuth = data;
      }
    );

    // know if the user is subscribe to the premium plan
    this.premiumSubscription = this.authService.premiumSubject.subscribe(
      (data:any)=>{
        this.isSub = data;
      }
    );

    // get the mail of the user
    this.actualUserSubscription = this.userService.userActualSubject.subscribe(
      (data:any)=>{
        const md5 = new Md5();
        this.mail = md5.appendStr(data.email).end().toString();
      }
    );

    // get informations from the actual user
    if (this.isAuth) {
      this.userService.getActualUser();
    }
  }


  /**
   * method:void
   *      display/hide the menu
   */
  onAppear():void {
    this.isMenu = !this.isMenu;
  }

  /**
   * method:void
   *     only hide the menu
   */
  onHide():void {
    this.isMenu = false;
  }


  /**
   * method
   *  move the nav element depending of the state of isMenu
   */
  onMenuOpen(){
    return(this.isMenu ? 'translateY(0rem)' : 'translateY(-15rem)')
  }

  /**
   * method:void
   *      reset the searchbar
   */
  onReset():void{
    this.activeSearchService.onSearchEvent.emit(false);
  }

  /**
   * method:void
   *    detect change of viewport, see if the app is running on mobile
   */
  @HostListener('window:resize', ['$event'])
  onResize():void {
    this.isMobile = this.mobileService.getIsMobile(); //detect changes of viewport
  }

}
