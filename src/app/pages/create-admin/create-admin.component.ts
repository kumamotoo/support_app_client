import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ADMINS_URL } from 'src/app/shared/constants';
import { Admin, HttpService } from 'src/app/shared/http.service';
import { AlertService } from './../../components/alert/alert.service';
import { EventsEmitter } from './../../shared/events.service';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.scss'],
})
export class CreateAdminComponent implements OnInit {
  public admin: Admin;
  public form: FormGroup;

  constructor(
    private httpService: HttpService,
    private eventsEmitter: EventsEmitter,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.eventsEmitter.title.emit('Create an Admin');

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      role: new FormControl('admin', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  create() {
    const { controls } = this.form;
    confirm(`Are you sure you want to create ${controls.name.value} admin?`);
    const body = {
      name: controls.name.value,
      email: controls.email.value,
      password: controls.password.value,
      role: controls.role.value,
    };
    this.httpService.create(ADMINS_URL, body).subscribe(
      () => {
        this.alertService.success(
          `Admin ${body.name} has successfully created`
        );
      },
      ({ error }) => {
        this.alertService.error(`Error: ${error.error}. ${error.message}`);
      }
    );
    this.form.reset();
  }
}
