import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  public isSettings = false;
  public isEdit = false;
  constructor() { }

  ngOnInit(): void {
  }

  onOpenSettings() {
    this.isSettings = !this.isSettings;
  }

  onEdit() {
    this.isEdit = !this.isEdit;
  }

}
