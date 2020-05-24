import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.scss']
})
export class AgreementComponent implements OnInit {

  isAgreement:boolean = false;

  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
        const route = this.route.snapshot.routeConfig.path;
        this.isAgreement = route === 'agreement' ? true : false;
  }

}
