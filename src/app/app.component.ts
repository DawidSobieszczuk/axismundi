import { HttpEventType } from '@angular/common/http';
import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { ArticleService } from './services/data/article.service';
import { MenuService } from './services/data/menu.service';
import { OptionService } from './services/data/option.service';
import { SocialService } from './services/data/social.service';
import { FileService } from './services/file.service';
import { SidePanelService } from './services/side-panel.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'axismundi';
  get isLoaded(): boolean {
    return this.optionService.isLoaded 
        && this.menuService.isLoaded
        && this.socialService.isLoaded
        && this.articleService.isLoaded
        && this.fileService.isLoaded;
  }

  constructor(
    private socialService: SocialService, 
    private optionService: OptionService, 
    private menuService: MenuService, 
    private articleService: ArticleService,
    private fileService: FileService,
    public userService: UserService,
    public sidePanelService: SidePanelService
  ) { }

  ngOnInit(): void {
    this.optionService.load();
    this.menuService.load();
    this.socialService.load();
    this.articleService.load();
    this.fileService.load();

    this.userService.checkIsUserLogged();
  }
}