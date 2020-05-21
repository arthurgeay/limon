import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MobileService {
  public isMobile = false;

  constructor() {
    this.isMobile = this.getIsMobile();// savoir si on est sur mobile dès le chargement
    window.onresize = () => this.isMobile = window.innerWidth <= 665; //detection du resize et passage à true selon la condition
   }
  
  
  getIsMobile(): boolean {
    return(document.documentElement.clientWidth < 665 ? true : false);
  }
}
