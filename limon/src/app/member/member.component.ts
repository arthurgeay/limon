import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {

  @Input() user;
  userID: any;


  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.userID = this.user.id;
  }


  onDelete() {
    this.http.delete(`https://api-limon.app-tricycle.com/api/user/?userId=${this.userID}`)
    .subscribe(
      (data:any)=>{
        this.router.navigate(['/'])
      },
      (error)=>{
        console.log(error);
      }
    )
  }
}
