import { Component, Input, NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Article } from '../../Models/article';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { ArticleService } from '../../Services/article-service';

@Component({
  selector: 'app-add-article',
  imports: [FormsModule, RouterLink],
  templateUrl: './add-article.html',
  styleUrl: './add-article.scss',
})
export class AddArticle {
  newArticle: Article = {id: "", nombre: "", categoria: "", descripcion: "", unidades: 0, precio: 0};

  constructor(private articleService: ArticleService) {}


  submit(){
    this.articleService.addArticle(this.newArticle);
    console.warn(this.newArticle);
  }

}
