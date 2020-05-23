import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-film',
  templateUrl: './edit-film.component.html',
  styleUrls: ['./edit-film.component.scss']
})
export class EditFilmComponent implements OnInit {

  isEdit = false;
  constructor() { }

  ngOnInit(): void {
  }

}
