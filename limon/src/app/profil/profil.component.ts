import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  public user:any;
  public isSettings = false;
  public isEdit = false;
  public actualUserSubscription:  Subscription;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.actualUserSubscription = this.userService.userActualSubject.subscribe(
      (data:any)=>{
        this.user = data;
        console.log(data);
      }
    );
    this.userService.getActualUser();
  }


  onOpenSettings() {
    this.isSettings = !this.isSettings;
  }

  onEdit() {
    this.isEdit = !this.isEdit;
  }

}
