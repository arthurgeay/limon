import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  @Input() note: string;
  @Input() userNote: any;
  movieID: any;
  isAuth: boolean;

  constructor(private http:HttpClient, private route:ActivatedRoute, private authService:AuthService) { }

  ngOnInit(): void {
    this.movieID = Number(this.route.snapshot.params['id']);  // get id from url
    this.isAuth = this.authService.isAuth();

    this.userNote = Number(this.userNote);
    //force check n(this.userNote)
  }

  onNote(note:number) {
    const formData = new FormData();
    formData.append('score', note.toString());
    this.http.post(`https://api-limon.app-tricycle.com/api/rating/${this.movieID}`, formData)
    .subscribe(
      (data:any)=>{
        this.note = data.avg.substring(0,1);
      },
      (error)=>{
        console.log(error);
      }
    )
  }
}
