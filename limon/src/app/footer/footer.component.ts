import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  showInstallButton: boolean;
  deferredPrompt: any;

  constructor() { }

  ngOnInit(): void {
  }

  installApp() {
    this.deferredPrompt.prompt(); //display prompt
    this.deferredPrompt.userChoice //user choice
    .then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('Youpi, notre appli est installée');
      } else {
        console.log('Arg, il en veut pas !');
        this.showInstallButton = false;
      }
      this.deferredPrompt = null;
      });
  }

  @HostListener('window:beforeinstallprompt', ['$event'])

    onBeforeinstallprompt(ev) {
      ev.preventDefault();
      // display install button
      this.showInstallButton = true;
      // stock prompt
      this.deferredPrompt = ev;
    }

  }
