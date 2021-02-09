import { Component } from '@angular/core';
import { getToken } from './shared/helpers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public token: string = getToken();

  onToken(token: string) {
    this.token = token;
  }
}
