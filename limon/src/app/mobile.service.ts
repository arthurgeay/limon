import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MobileService {

  public isMobile = false;
  
  constructor() {
      this.isMobile = this.getIsMobile();// Detect if mobile at load
   }
  
  // Detect Mobile or desktop
  getIsMobile(): boolean {
    return(document.documentElement.clientWidth < 665 ? true : false);
  }

  
}
