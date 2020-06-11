import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public showInstallButton: boolean;
  public deferredPrompt: any;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * method:void
   *    install PWA on the device
   */
  installApp():void {
    this.deferredPrompt.prompt(); //display prompt
    this.deferredPrompt.userChoice //user choice
    .then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
      } else {
        this.showInstallButton = false;
      }
      this.deferredPrompt = null;
      });
  }


  /**
   * method:void
   *    detect if the user already have PWA installed and show popup if not
   */
  @HostListener('window:beforeinstallprompt', ['$event'])
    onBeforeinstallprompt(ev) {
      ev.preventDefault();
      // display install button
      this.showInstallButton = true;
      // stock prompt
      this.deferredPrompt = ev;
    }

  }
