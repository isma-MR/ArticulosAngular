import { Injectable } from '@angular/core';
import { HttpService } from './http-service';
import { Article } from '../Models/article';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService extends HttpService {
  override url = "http://localhost:3000/articles";

  generateIdByCategory(category: string): Observable<string> {
  return this.getAll<Article[]>().pipe(
    map(articles => {
      const cleanCategory = category.toLowerCase().replace(/\s+/g, '');
      let prefixLength = 1;
      let prefix = cleanCategory.slice(0, prefixLength);

      // Filtrar artículos que pertenezcan a la misma categoría
      const sameCategoryArticles = articles.filter(a => a.categoria.toLowerCase() === cleanCategory);

      if (sameCategoryArticles.length > 0) {
        // Si ya existen artículos de esa categoría, usar el prefijo de los existentes
        const existingPrefix = sameCategoryArticles[0].id.match(/^[a-z]+/i)?.[0] || prefix;
        prefix = existingPrefix;
      } else {
        // Categoría nueva: evitar colisiones con otras categorías
        let collision = true;
        while (collision && prefixLength <= cleanCategory.length) {
          collision = articles.some(a => a.id.startsWith(prefix));
          if (collision) prefixLength++;
          prefix = cleanCategory.slice(0, prefixLength);
        }
      }

        // Contar cuántos artículos ya existen con ese prefijo y la misma categoría
        const count = sameCategoryArticles.filter(a => a.id.startsWith(prefix)).length;

        // ID final
        return prefix + (count + 1);
      })
    );
  }

}
