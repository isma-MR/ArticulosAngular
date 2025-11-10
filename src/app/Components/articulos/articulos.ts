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
    this.articleService.getAll().subscribe({
      next: (datos) => (this.articles = datos as Article[]),
      error: (error) => console.log('ERROR ' + error.status),
});

  }
}
