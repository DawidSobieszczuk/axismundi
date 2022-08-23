import { Injectable } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ApiResponse } from 'src/app/models/responses';
import { DataAbstractService } from '../abstract/data.abstract.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService extends DataAbstractService<Article> {
  protected override _url: string = '/api/v1/articles';
  private _urlPublish = '/api/v1/articles/publish';
  private _urlUnpublish = '/api/v1/articles/unpublish';

  reversed = true;

  override getAll(): Article[] {
    if(!this.reversed) return super.getAll();

    return super.getAll().reverse();
  }

  set(id: number, data: {
    title: string,
    thumbnail: string,
    excerpt: string,
    content: string,
    categories: string[],
    tags: string[],
  }) {
    let article = this.get(id);
    if(!article) throw new Error(this.ERROR_NOT_FOUND);

   super.setElement(id, {
    id: id,
    title: data.title || article.title,
    thumbnail: data.thumbnail || article.thumbnail,
    excerpt: data.excerpt || article.excerpt,
    content: data.content || article.content,
    is_draft: article.is_draft,
    categories: data.categories || article.categories,
    tags: data.tags || article.tags,
   } as Article);
  }

  add(data: {
    title: string,
    thumbnail: string,
    excerpt: string,
    content: string,
    categories: string[],
    tags: string[],
  }): void {
    super.addElement({
      id: -1,
      title: data.title || '',
      thumbnail: data.thumbnail || '',
      excerpt: data.excerpt || '',
      content: data.content || '',
      is_draft: true,
      categories: data.categories || [],
      tags: data.tags || [],
    } as Article)
  }

  publish(id: number): void {
    let article = this.get(id);
    if(!article) throw new Error(this.ERROR_NOT_FOUND);
    
    this.http.put<ApiResponse>(this._urlPublish + `/${id}`, {}).subscribe({
      next: (v) => {
        this.notificationService.open(v.message, 'success');
        this.set(id, v.data);
      },
      error: (e) => this.notificationService.open(e.error.message, 'error')
    });
  }

  unpublish(id: number): void {
    let article = this.get(id);
    if(!article) throw new Error(this.ERROR_NOT_FOUND);
    this.http.put<ApiResponse>(this._urlUnpublish + `/${id}`, {}).subscribe({
      next: (v) => {
        this.notificationService.open(v.message, 'success');
        this.set(id, v.data);
      },
      error: (e) => this.notificationService.open(e.error.message, 'error')
    });
  }
}
