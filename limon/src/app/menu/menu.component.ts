import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public isMobile = false;
  public isMenu = false;
  constructor() { }

  ngOnInit(): void {
    this.isMobile = this.getIsMobile();
    window.onresize = () => this.isMobile = window.innerWidth <= 665;
  }
  getIsMobile(): boolean {
    return(document.documentElement.clientWidth < 665 ? true : false);
  }
  onAppear() {
    this.isMenu = !this.isMenu;
  }
  onMenuOpen(){
    return(this.isMenu ? 'translateY(0rem)' : 'translateY(-12rem)')
  }

}
