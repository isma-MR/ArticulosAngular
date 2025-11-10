import { Component, Input, NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Article } from '../../Models/article';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { ArticleService } from '../../Services/article-service';
import { map, Observable, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-update-article',
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './update-article.html',
  styleUrl: './update-article.scss',
})
export class UpdateArticle {
  article$!: Observable<Article>;
  currentArticle!: Article;

  constructor(private articleService: ArticleService, private activatedRoute: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.article$ = this.activatedRoute.params.pipe(
      map(params => params['id']),
      switchMap(id => this.articleService.findById<Article>(id)),
      tap(article => this.currentArticle = article)
    )
  }


  submit() {
    this.articleService.update(this.currentArticle.id, this.currentArticle).subscribe({
      next: updated => console.log('Actualizado:', updated),
      error: err => console.error('Error al actualizar:', err)
    });
  }

}
