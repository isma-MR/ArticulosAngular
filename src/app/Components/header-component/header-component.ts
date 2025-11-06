import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../../Services/login-service';

@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
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

  logOut(): void {
    this.loginService.logOut();
  }

  ngOnDestroy(): void {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }
}
