import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.scss']
})
export class DoneComponent implements OnInit {
  isComplete: boolean;

  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    const route = this.route.snapshot.routeConfig.path;
    this.isComplete = route === 'complete' ? true : false;
  }

}
