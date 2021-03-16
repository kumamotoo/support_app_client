import { AfterContentInit, Component, EventEmitter } from '@angular/core';
import { EventsEmitter } from '../shared/events.service';
import { clearStorage, getUser } from '../shared/helpers';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements AfterContentInit {
  public breadcrumbsId: string;
  public breadcrumbsTitle: string;
  public breadcrumbsRoute: string;
  public user: any;

  constructor(private eventEmitter: EventsEmitter) {}

  ngAfterContentInit() {
    this.eventEmitter.title.subscribe((t: string) => {
      this.breadcrumbsTitle = t;
      this.breadcrumbsId = '';
    });
    this.eventEmitter.id.subscribe((id: string) => (this.breadcrumbsId = id));
    this.eventEmitter.route.subscribe(
      (route: string) => (this.breadcrumbsRoute = route)
    );

    this.user = getUser();
  }

  logout() {
    clearStorage();
    window.location.reload();
  }
}
