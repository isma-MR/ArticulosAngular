import { CanActivateFn } from '@angular/router';

export const articleGuardGuard: CanActivateFn = (route, state) => {
  const name = prompt("Dime tu nombre: ");
  if (name == null || name != "Yo") {
    return false;
  }
  return true;
};
