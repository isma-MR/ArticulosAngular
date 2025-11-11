import { Injectable } from '@angular/core';
import { User } from '../Models/user';
import { USERS } from '../Models/userData';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpService } from './http-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends HttpService {
  // BehaviorSubject que almacena si el usuario está logueado o no
  private isLoggedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  // Observable público para que otros componentes/guards puedan suscribirse
  isLogged$: Observable<boolean> = this.isLoggedSubject.asObservable();

  override url:string = "http://localhost:3000/users";
  private users!: User[];

  constructor(private route: Router, httpClient: HttpClient) {
    super(httpClient);
  }

checkLogin(user: User): void {
  this.getAll<User[]>().subscribe({
    next: (users: User[]) => {
      const userLogged = users.find(u => u.username === user.username && u.password === user.password);

      if (userLogged) {
        this.isLoggedSubject.next(true);
        this.route.navigate(['/']);
      } else {
        alert('Usuario o contraseña incorrectos');
        this.isLoggedSubject.next(false);
      }
    },
    error: (err) => console.error(err)
  });
}

  logOut() {
    this.isLoggedSubject.next(false);
  }
}
