import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userSubject = new Subject<any>();
  user: any;

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

  constructor() { }
  getUserById(id:number){
    const user = this.users.find(
      (s) => {
        return s.id === id;
      }
    );
    return user;
  }

  emitUserSubject() {
    this.userSubject.next(this.user);
  }

}
