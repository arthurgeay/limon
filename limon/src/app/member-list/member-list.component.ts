import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  users: any[];

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.users = this.userService.users
  }

}
