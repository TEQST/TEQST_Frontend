import { UsermgmtService } from 'src/app/services/usermgmt.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-language-selector',
  templateUrl: './menu-language-selector.component.html',
  styleUrls: ['./menu-language-selector.component.scss'],
})
export class MenuLanguageSelectorComponent implements OnInit {

  language: string;

  constructor(private userService: UsermgmtService) { }

  ngOnInit() {
    this.language = this.userService.getMenuLanguage();
  }

  changeLanguage(): void {
    this.userService.setMenuLanguage(this.language);
  }

}
