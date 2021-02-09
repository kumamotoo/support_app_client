import { Component, OnInit } from '@angular/core';
import { getPerson } from './../shared/helpers';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public more: boolean = false;
  public icon: string = 'expand_more';
  public person;

  ngOnInit(): void {
    this.person = getPerson();
  }

  showMore() {
    if (this.more) {
      this.more = false;
      this.icon = 'expand_more';
      return;
    }

    this.more = true;
    this.icon = 'expand_less';
  }
}
