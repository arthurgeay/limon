import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  public id:number;
  public user:any;
  public isSettings = false;
  public isEdit = false;
  public isActual: boolean;
  public userSubscription: Subscription;
  public actualUserSubscription:  Subscription;
  constructor(private userService: UserService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    const route = this.route.snapshot.routeConfig.path;
    this.id = Number(this.route.snapshot.params['id']);  // get id from url
    this.isActual = route === 'profil' ? true : false;
    console.log('Isactual' + this.isActual);
    
    
    if (this.isActual) {
      this.displayActualUser();
    }
    else {
      this.displayParticularUser();
    }
  }


  onOpenSettings() {
    this.isSettings = !this.isSettings;
  }

  onEdit() {
    this.isEdit = !this.isEdit;
  }

  displayActualUser() {
    this.actualUserSubscription = this.userService.userActualSubject.subscribe(
      (data:any)=>{
        this.user = data;
        console.log(data);
      }
    );
    this.userService.getActualUser();
  }

  displayParticularUser() {
    this.userSubscription = this.userService.userSubject.subscribe(
      (data:any)=>{
        this.user = data;
        console.log(data);
        console.log('tout a fait');
      }
    );
    this.userService.getUserById(this.id);
  }

}
