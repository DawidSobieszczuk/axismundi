import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ArticleResolver } from './resorvers/article.resolver';
import { ArticlesResolver } from './resorvers/articles.resolver';

const routes: Routes = [
  {path: '', component: HomeComponent, resolve: {
    articles: ArticlesResolver
  }},
  {path: 'login', component: LoginComponent },
  {path: 'article/:id', component: ArticleComponent, resolve: {
    article: ArticleResolver
  }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
