import { Routes } from '@angular/router';
import { Articulos } from './Components/articulos/articulos';
import { Articulo } from './Components/articulo/articulo';
import { Index } from './Components/index';
import { UpdateArticle } from './Components/update-article/update-article';
import { RemoveArticle } from './Components/remove-article/remove-article';
import { AddArticle } from './Components/add-article/add-article';
import { articleGuardGuard } from './Guards/article-guard-guard';
import { Login } from './Components/login/login';
import { loginGuard } from './Guards/login-guard';

export const routes: Routes = [
    {path: '', component: Index},
    {path: 'articles',component: Articulos, canActivate:[loginGuard]},
    {path: 'articles/:id', component: Articulo, canActivate:[loginGuard]},
    {path: 'articles/:id/update', component: UpdateArticle, canActivate:[loginGuard]},
    {path: 'articles/:id/remove', component: RemoveArticle, canActivate:[loginGuard]},
    {path: 'add', component: AddArticle, canActivate:[loginGuard]},
    {path: 'login',component: Login}

];
