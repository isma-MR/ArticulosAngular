import { Component, Input } from '@angular/core';
import { ArticleService } from '../../Services/article-service';
import { Article } from '../../Models/article';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-articulo',
  imports: [RouterLink],
  templateUrl: './articulo.html',
  styleUrl: './articulo.scss',
})
export class Articulo {

  @Input() article: Article | undefined;
  id!: string;

  constructor(private articleService: ArticleService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(){
    this.activatedRoute.params.subscribe(
      params=>{this.article=this.articleService.findById(params["id"]); if (this.article){ this.id = this.article.id}}
    )
  }

  get isDisabled(): boolean {
    if (this.article) {
    return this.article.unidades <= 0;
    }
    return true;
  }
}
