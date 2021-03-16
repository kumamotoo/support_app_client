import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { REQUEST_URL } from 'src/app/shared/constants';
import { EventsEmitter } from 'src/app/shared/events.service';
import { AlertService } from 'src/app/components/alert/alert.service';
import { HttpService } from '../../shared/http.service';
import { getUser, isRoleMatch, Role } from 'src/app/shared/helpers';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public from: FormGroup;
  public user: any;
  public isUser: boolean = false;

  constructor(
    private httpService: HttpService,
    private eventsEmitter: EventsEmitter,
    private alertService: AlertService
  ) {
    this.eventsEmitter.title.emit('Dashboard');
    this.eventsEmitter.route.emit('/');
  }

  ngOnInit(): void {
    this.user = getUser();

    if (isRoleMatch(this.user, Role.USER)) {
      this.isUser = true;
    }
    this.from = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.isUser) {
      const { controls } = this.from;

      const data = {
        title: controls.title.value,
        description: controls.description.value,
        creator: this.user.id,
      };

      this.httpService.create(REQUEST_URL, data).subscribe(
        () => {
          this.alertService.success(`Your request has successfully created`);
          this.from.reset();
        },
        ({ error }) =>
          this.alertService.error(`Error: ${error.error}. ${error.message}`)
      );
    }
  }
}
