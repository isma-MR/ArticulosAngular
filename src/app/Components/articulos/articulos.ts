import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleService } from '../../Services/article-service';
import { Article } from '../../Models/article';
import { RouterLink } from "@angular/router";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-articulos',
  standalone: true,
  templateUrl: './articulos.html',
  styleUrls: ['./articulos.scss'],
  imports: [RouterLink, CommonModule],
})
export class Articulos implements OnInit {

  articles$!: Observable<Article[]>;

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articles$ = this.articleService.getAll<Article[]>();
  }
}
