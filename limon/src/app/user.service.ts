import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userSubject = new Subject<any>();
  public userActualSubject = new Subject<any>();
  public user: any;
  public actualUser: any;

  constructor(private http:HttpClient) { }

  /**
   * method: void
   *    get information from the actual user
   */
  getActualUser():void {
    this.http.get(`https://api-limon.app-tricycle.com/api/user/`)
      .subscribe(
        (data:any)=>{
          this.actualUser = data;
          this.emitActualUserSubject();
        },
        (error)=>{
          // console.log(error);
        }
      )     
  }


  /**
   * method: void / params:number
   *    get information from a specific user
   */
  getUserById(id:number):void {
    this.http.get(`https://api-limon.app-tricycle.com/api/user/?userId=${id}`)
      .subscribe(
        (data:any)=>{
          this.user = data;
          this.emitUserSubject();
        },
        (error)=>{
          // console.log(error);
        }
      )     
  }

  /**
   * method: void
   *    emit info to subscription
   */
  public emitUserSubject():void {
    this.userSubject.next(this.user);
  }


  /**
   * method: void
   *    emit info to subscription
   */
  public emitActualUserSubject():void {
    this.userActualSubject.next(this.actualUser);
  }

  
  /**
   * method: void / params:number
   *    delete a specific user or the actual user
   */
  deleteUser(id:number):void {
    if(id !== 0) {
      this.http.delete(`https://api-limon.app-tricycle.com/api/user/?userId=${id}`)
      .subscribe(
        (data:any)=>{
        },
        (error)=>{
          // console.log(error);
        }
      ) 
    }
    else {
      this.http.delete(`https://api-limon.app-tricycle.com/api/user/`)
      .subscribe(
        (data:any)=>{
        },
        (error)=>{
          // console.log(error);
        }
      ) 
    }
 
  }

}
