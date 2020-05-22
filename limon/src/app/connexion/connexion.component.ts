import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  public isLogin = false;
  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    const route = this.route.snapshot.routeConfig.path;
    this.isLogin = route === 'login' ? true : false;
  }

}
