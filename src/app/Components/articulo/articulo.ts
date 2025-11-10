import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleService } from '../../Services/article-service';
import { Article } from '../../Models/article';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, Observable, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-articulo',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './articulo.html',
  styleUrl: './articulo.scss',
})
export class Articulo implements OnInit {

  article$!: Observable<Article>;

  constructor(
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.article$ = this.activatedRoute.params.pipe(
      map(params => params['id']),
      switchMap(id => this.articleService.findById<Article>(id))
    );
  }
}
