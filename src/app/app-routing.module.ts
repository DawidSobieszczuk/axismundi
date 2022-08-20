import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'category/:category', component: HomeComponent },
  {path: 'tag/:tag', component: HomeComponent },
  {path: 'login', component: LoginComponent },
  {path: 'article/:id', component: ArticleComponent },
  {path: '404', component: NotFoundComponent },
  {path: '**', redirectTo: '/404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }