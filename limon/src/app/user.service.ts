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

  users: any[] = [
    {
      id: 1,
      image: '../../assets/profil-membres/pink-man.jpg',
      name: 'Jean-Raoul'
    },
    {
      id: 2,
      image: '../../assets/profil-membres/pointing-man.jpg',
      name: 'Corentin'
    },
    {
      id: 3,
      image: '../../assets/profil-membres/bear-girl.jpg',
      name: 'JUL le sang'
    },
    {
      id: 4,
      image: '../../assets/profil-membres/hat-man.jpg',
      name: 'Gégé'
    },
    {
      id: 5,
      image: '../../assets/profil-membres/stray-man.jpg',
      name: 'the watcher'
    },
    {
      id: 6,
      image: '../../assets/profil-membres/suit-man.jpg',
      name: 'tout les kilos sont dans l\'auto'
    },
    {
      id: 7,
      image: '../../assets/profil-membres/vegetable-man.jpg',
      name: 'Netflux'
    }
  ]


  constructor(private http:HttpClient) { }

  getActualUser() {
    this.http.get(`https://api-limon.app-tricycle.com/api/user/`)
      .subscribe(
        (data:any)=>{
          this.actualUser = data;
        },
        (error)=>{
          console.log(error);
        }
      )     
  }

  getUserById(id:number){
    const user = this.users.find(
      (s) => {
        return s.id === id;
      }
    );
    return user;
  }

  public emitUserSubject() {
    this.userSubject.next(this.user);
  }

  public emitActualUserSubject() {
    this.userActualSubject.next(this.actualUser);
  }

}
