import { Component, Input, NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Article } from '../../Models/article';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { ArticleService } from '../../Services/article-service';

@Component({
  selector: 'app-update-article',
  imports: [FormsModule, RouterLink],
  templateUrl: './update-article.html',
  styleUrl: './update-article.scss',
})
export class UpdateArticle {
  article!: Article | undefined;
  id!:string;

  constructor(private articleService: ArticleService, private activatedRoute: ActivatedRoute) {}
  

  ngOnInit(){
    this.activatedRoute.params.subscribe(
      params=>{this.article=this.articleService.findById(params["id"]); if (this.article){ this.id = this.article.id}}
    )
    console.log("ID: "+this.id);
  }

  submit(){
    console.log(this.article);
    this.articleService.putArticle(this.article!);
    console.warn(this.article);
  }
}
