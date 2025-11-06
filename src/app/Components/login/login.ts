import { Component, Input, NgModule} from '@angular/core';
import { User } from '../../Models/user';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from "@angular/router";
import { LoginService } from '../../Services/login-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

constructor(private loginService:LoginService){}


  private loginSub!: Subscription;


  user:User = {
    username: "",
    password:""
  }

    ngOnInit() {
    this.loginSub = this.loginService.isLogged$.subscribe({
      next: value => console.log(value),
      error: error => console.error(error),
      complete: () => console.log('Observable completado')
    });
  }

  checkLogin(){
    this.loginService.checkLogin(this.user);
  }
}
