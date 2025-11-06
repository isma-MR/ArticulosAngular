import { Injectable } from '@angular/core';
import { User } from '../Models/user';
import { USERS } from '../Models/userData';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // BehaviorSubject que almacena si el usuario está logueado o no
  private isLoggedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  // Observable público para que otros componentes/guards puedan suscribirse
  isLogged$: Observable<boolean> = this.isLoggedSubject.asObservable();

  private users!: User[];

  constructor( private route:Router) {
    this.getUsers();
  }

  getUsers() {
    this.users = USERS;
  }

  checkLogin(user: User): boolean {
    if (!this.users) {
      this.getUsers();
    }

    const userLogged = this.users.find(
      u => u.username === user.username && u.password === user.password
    );

    if (userLogged) {
      this.isLoggedSubject.next(true);
      this.route.navigate(["/"]);
      return true;
    } else {
      alert('El usuario o la contraseña son incorrectos');
      this.isLoggedSubject.next(false);
      return false;
    }
  }

  logOut() {
    this.isLoggedSubject.next(false);
  }
}
