import { CanActivateFn } from '@angular/router';
import { LoginService } from '../Services/login-service';
import { inject } from '@angular/core';



export const loginGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  return loginService.isLogged$;
};
