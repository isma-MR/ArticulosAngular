import { Component } from '@angular/core';
import { ArticleService } from '../../Services/article-service';
import { Article } from '../../Models/article';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-articulos',
  imports: [RouterLink],
  templateUrl: './articulos.html',
  styleUrl: './articulos.scss',
})
export class Articulos {

  articles!: Article[];
  constructor(private articleService: ArticleService){}

  ngOnInit(){
    this.articles = this.articleService.getArticles().sort((a, b) => a.id.localeCompare(b.id));
  }

  

}
