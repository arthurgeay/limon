import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  @Input() note:string;
  constructor() { }

  ngOnInit(): void {
  }

  onTouch(nb:number){

    return(`.note-select-item:nth-child(-n+${nb})`)
  }

}
