import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Article } from '../../Models/article';
import { RouterLink } from "@angular/router";
import { ArticleService } from '../../Services/article-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-article',
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './add-article.html',
  styleUrl: './add-article.scss',
  standalone: true
})
export class AddArticle {
  newArticle: Article = {id: "", nombre: "", categoria: "", descripcion: "", unidades: 0, precio: 0};

  constructor(private articleService: ArticleService) {}

  submit() {
    if (!this.newArticle.categoria) {
      console.error("Debe introducir una categoría");
      return;
    }

    // Generamos un ID único antes de insertar
    this.articleService.generateIdByCategory(this.newArticle.categoria).subscribe(id => {
      this.newArticle.id = id;

      this.articleService.insert(this.newArticle).subscribe({
        next: data => console.log("Artículo añadido correctamente:", data),
        error: error => console.error("Error al añadir artículo:", error)
      });

      console.log("Nuevo artículo:", this.newArticle);
    });
  }
}
