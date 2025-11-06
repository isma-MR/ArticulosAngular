import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { Subscription } from 'rxjs';
import { LoginService } from '../../Services/login-service';


@Component({
  selector: 'app-index',
  imports: [RouterLink],
  templateUrl: './index.html',
  styleUrl: './index.scss',
})
export class Index {
  constructor(private route:Router){}
  loginService = inject(LoginService);
  loginSub!: Subscription;
  isLogged: boolean = false;
  ngOnInit() {
    this.loginSub = this.loginService.isLogged$.subscribe({
      next: value => this.isLogged = value,
      error: error => console.error(error),
      complete: () => console.log('Observable completado')
    });
  }


  goToProducts(){
    if(this.isLogged){
      this.route.navigate(["/articles"]);
    } else {
      this.route.navigate(["/login"]);
    }
  }
}
