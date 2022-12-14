import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MaterialElevationDirective } from './directives/material-elevation.directive';
import { AuthInterceptor } from './interceptors/auth.interceptor';

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import  { ClipboardModule } from '@angular/cdk/clipboard';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRippleModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleComponent } from './article/article.component';
import { HomeComponent } from './home/home.component';
import { HeroComponent } from './hero/hero.component';
import { SidePanelComponent } from './side-panel/side-panel.component';
import { SidePanelUserComponent } from './side-panel-user/side-panel-user.component';
import { SidePanelArticleComponent } from './side-panel-article/side-panel-article.component';
import { SidePanelOptionComponent } from './side-panel-option/side-panel-option.component';
import { SidePanelSocialComponent } from './side-panel-social/side-panel-social.component';
import { NotificationComponent } from './notification/notification.component';
import { ArticleEditorComponent } from './article-editor/article-editor.component';
import { SidePanelMenuComponent } from './side-panel-menu/side-panel-menu.component';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    ArticlesComponent,
    HeroComponent,
    HomeComponent,
    ArticleComponent,
    MaterialElevationDirective,
    SidePanelComponent,
    SidePanelUserComponent,
    SidePanelArticleComponent,
    SidePanelOptionComponent,
    SidePanelSocialComponent,
    NotificationComponent,
    ArticleEditorComponent,
    SidePanelMenuComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    
    ReactiveFormsModule,
    BrowserAnimationsModule,

    ClipboardModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatSidenavModule,
    MatRippleModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatListModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
