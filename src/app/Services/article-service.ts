import { Injectable } from '@angular/core';
import { Article } from '../Models/article';
import { ARTICLES } from '../Models/articlesData';
import { findIndex } from 'rxjs';
import { HttpService } from './http-service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService extends HttpService{
    override url = "http://localhost/articles"
}
