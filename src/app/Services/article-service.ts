import { Injectable } from '@angular/core';
import { Article } from '../Models/article';
import { ARTICLES } from '../Models/articlesData';
import { findIndex } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  articles: Article[] = ARTICLES

  getArticles(){
    return this.articles
  }

  deleteArticle(id: string) {
    this.articles.splice(this.articles.findIndex((article: { id: string; }) => article.id === id), 1);
    console.log(`Artículo con ID ${id} eliminado.`);
  }

  putArticle(newArticle: Article){
    let article = this.findById(newArticle.id);
    if (!article){
      console.warn("Error: no existe el articulo: " + newArticle.id);
      return;
    }
    let pos = this.articles.findIndex(a => a.id == newArticle.id);
    this.articles[pos] = newArticle;
  }
  
addArticle(article: Article) {
  const categoria = article.categoria;

  // 1️⃣ Mapear categorías existentes a su prefijo
  const prefijosExistentes: { [categoria: string]: string } = {};
  this.articles.forEach(a => {
    if (!(a.categoria in prefijosExistentes)) {
      const match = a.id.match(/^([a-zA-Z]+)\d+$/);
      if (match) prefijosExistentes[a.categoria] = match[1];
    }
  });

  let prefijo: string;

  if (prefijosExistentes[categoria]) {
    // Categoría existente → usar prefijo ya asignado
    prefijo = prefijosExistentes[categoria];
  } else {
    // Categoría nueva → generar prefijo dinámico
    const categoriasExistentes = Object.keys(prefijosExistentes);
    prefijo = categoria[0].toLowerCase();
    let index = 1;

    while (index <= categoria.length) {
      const candidato = categoria.substring(0, index).toLowerCase();

      const conflicto = categoriasExistentes.some(cat => {
        const catPrefijo = prefijosExistentes[cat];
        // Conflicto si el candidato es igual o empieza igual que un prefijo existente
        return catPrefijo.startsWith(candidato) || candidato.startsWith(catPrefijo);
      });

      if (!conflicto) break; // No hay conflicto → usamos este prefijo

      index++;
      prefijo = categoria.substring(0, index).toLowerCase();
    }
  }

  // 2️⃣ Buscar artículos cuyo ID empiece con este prefijo
  const articulosCategoria = this.articles.filter(a =>
    a.id.startsWith(prefijo)
  );

  // 3️⃣ Calcular número secuencial
  let nuevoNumero = 1;
  if (articulosCategoria.length > 0) {
    const numeros = articulosCategoria.map(a => {
      const match = a.id.match(/^([a-zA-Z]+)(\d+)$/);
      return match && match[1] === prefijo ? parseInt(match[2], 10) : 0;
    });
    nuevoNumero = Math.max(...numeros) + 1;
  }

  // 4️⃣ Crear artículo con ID correcto (prefijo + número)
  const newArticle: Article = {
    ...article,
    id: `${prefijo}${nuevoNumero}`, // <-- aquí solo usamos el prefijo
  };

  this.articles.push(newArticle);
}






  incremetCuantity(id: string) {
    const article = this.articles.find((article: { id: string; }) => article.id === id);
    if (article) {
      article.unidades += 1;
      console.log(`Cantidad del artículo con ID ${id} incrementada. Nueva cantidad: ${article.unidades}`);
    }
  }

  decrementCuantity(id: string) {
    const article = this.articles.find((article: { id: string; }) => article.id === id);
    if (article && article.unidades > 0) {
      article.unidades -= 1;
      console.log(`Cantidad del artículo con ID ${id} decrementada. Nueva cantidad: ${article.unidades}`);
    }
  }

  findById(id:string){
    return this.articles.find(a=> a.id === id)
  }

}
