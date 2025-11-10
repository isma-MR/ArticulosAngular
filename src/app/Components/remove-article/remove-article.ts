import { Component } from '@angular/core';
import { Article } from '../../Models/article';
import { ArticleService } from '../../Services/article-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, Observable, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-remove-article',
  imports: [RouterLink, CommonModule],
  templateUrl: './remove-article.html',
  styleUrl: './remove-article.scss',
})
export class RemoveArticle {
  article$!: Observable<Article>;
  currentArticle!: Article;
  constructor(private articleService: ArticleService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.article$ = this.activatedRoute.params.pipe(
      map(params => params['id']),
      switchMap(id => this.articleService.findById<Article>(id)),
      tap(article => this.currentArticle = article)
    )
  }

  removeArticle() {
    this.articleService.delete(this.currentArticle.id).subscribe({
      next: () => console.log('Eliminado artículo con ID:', this.currentArticle.id),
      error: error => console.error('Error al eliminar:', error)
    })
  }
}
