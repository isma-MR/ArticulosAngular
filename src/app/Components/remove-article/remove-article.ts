import { Component } from '@angular/core';
import { Article } from '../../Models/article';
import { ArticleService } from '../../Services/article-service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-remove-article',
  imports: [RouterLink],
  templateUrl: './remove-article.html',
  styleUrl: './remove-article.scss',
})
export class RemoveArticle {
  article!:Article | undefined;
  id!: string;

  constructor(private articleService: ArticleService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(){
    this.activatedRoute.params.subscribe(
      params=>{this.article=this.articleService.findById(params["id"]); if (this.article){ this.id = this.article.id}}
    )
    console.log("ID: "+this.id);
  }

  deleteArticle() {
    this.articleService.deleteArticle(this.id);
    alert("Se eliminó el articulo:" + this.article?.nombre);
    console.warn("Se eliminó el articulo:" + this.article);
  }
}
