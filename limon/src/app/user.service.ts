import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userSubject = new Subject<any>();
  userActualSubject = new Subject<any>();
  user: any;
  actualUser: any;



  constructor(private http:HttpClient) { }

  getActualUser() {
    this.http.get(`https://api-limon.app-tricycle.com/api/user/`)
      .subscribe(
        (data:any)=>{
          this.actualUser = data;
          this.emitActualUserSubject();
        },
        (error)=>{
          console.log(error);
        }
      )     
  }

  getUserById(id:number){
    this.http.get(`https://api-limon.app-tricycle.com/api/user/?userId=${id}`)
      .subscribe(
        (data:any)=>{
          this.user = data;
          this.emitUserSubject();
        },
        (error)=>{
          console.log(error);
        }
      )     
  }

  public emitUserSubject() {
    this.userSubject.next(this.user);
  }

  public emitActualUserSubject() {
    this.userActualSubject.next(this.actualUser);
  }

}
