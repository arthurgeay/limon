import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {

  public users: any[];

  constructor(private http:HttpClient) { }

  ngOnInit(): void {

    // get all users
    this.http.get(`https://api-limon.app-tricycle.com/api/admin/users`)
    .subscribe(
      (data:any)=>{
        this.users = data;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

}
