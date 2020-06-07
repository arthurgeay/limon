import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() isModal:boolean;
  @Output() isModalChange = new EventEmitter<boolean>();
  @Input() public movieID:any;
  @Input() public subject:string;
  @Input() public path:any;
  @Input() public isActual:any;

  constructor(
    private http:HttpClient,
    private router:Router,
    private route:ActivatedRoute,
    private userService:UserService
  ) { }

  ngOnInit(): void {

  }

  onExit() {
    this.isModalChange.emit(false);
  }
  onMovieDelete() {
    this.http.delete(`https://api-limon.app-tricycle.com/api/movie/${this.movieID}`)
    .subscribe(
      (data:any)=>{
        this.router.navigate(['/'])
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  onReviewDelete() {
    this.http.delete(`https://api-limon.app-tricycle.com/api/review/${this.movieID}`)
      .subscribe(
        (data: any) => {
          console.log(data);
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([this.path]);
          });
        },
        (error) => {
          console.log(error);
        }
      )
  }

  onUserDelete() {
    this.isActual ? this.userService.deleteUser(0) : this.userService.deleteUser(this.movieID);
    this.router.navigate(['/'])
  }
}
