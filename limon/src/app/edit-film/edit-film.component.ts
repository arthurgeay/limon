import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-film',
  templateUrl: './edit-film.component.html',
  styleUrls: ['./edit-film.component.scss']
})
export class EditFilmComponent implements OnInit {
  userForm: FormGroup;
  isEdit = false;
  constructor() { }

  ngOnInit(): void {
  }

  onSubmitForm() {
    
  }
}
