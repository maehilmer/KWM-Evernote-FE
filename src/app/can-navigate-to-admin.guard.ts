import {CanActivateFn, Router} from '@angular/router';
import {AuthenticationService} from "./shared/authentication.service";
import {inject} from "@angular/core";

export const canNavigateToAdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);
  console.log("maybe here?")
  if (authService.isLoggedIn()) {
    return true;
    console.log("not errror")
  } else {
    window.alert("Du musst Dich einloggen, um den Administrationsbereich zu betreten");
    console.log(state);
    console.log("Window", window);
    console.log("error");
    router.navigate(["../"]);
    return false;
  }
};
