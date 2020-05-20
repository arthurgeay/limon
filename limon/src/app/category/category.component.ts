import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  public isCatChoose = false;
  public categories = ['Animation','Aventure','Comédie','Enquêtes','Fantaisie','Guerre','Historique','Horreur','Polar','Science Fiction','Vie Quotidienne'];
  constructor() { }

  ngOnInit(): void {
  }

  onCatChoose()  {
    this.isCatChoose = !this.isCatChoose;
  }
}
