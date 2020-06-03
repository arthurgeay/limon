import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  users: any[];

  constructor(private userService:UserService,
    private http:HttpClient) { }

  ngOnInit(): void {
    this.http.get(`https://api-limon.app-tricycle.com/api/admin/users?page=1`)
    .subscribe(
      (data:any)=>{
        this.users = data.users;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

}
