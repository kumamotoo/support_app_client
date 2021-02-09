import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EventsEmitter } from './../../shared/events.service';
import { HttpService, Admin, User } from 'src/app/shared/http.service';
import { AlertService } from './../../components/alert/alert.service';
import { ADMINS_URL, USERS_URL } from 'src/app/shared/constants';
import { getPerson, Role } from 'src/app/shared/helpers';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public person: Admin | User;
  // public icon = 'visibility';
  public type = 'password';
  public form: FormGroup;
  public id: string;

  constructor(
    private httpService: HttpService,
    private eventsEmitter: EventsEmitter,
    private alertService: AlertService
  ) {
    this.eventsEmitter.title.emit('Profile');
    this.eventsEmitter.route.emit('/profile');
  }

  ngOnInit(): void {
    this.id = getPerson().id;
    this.eventsEmitter.id.emit(this.id);

    this.findOne();

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  findOne() {
    let url = getPerson().role === Role.USER ? USERS_URL : ADMINS_URL;

    this.httpService.findOne(url, this.id).subscribe((person) => {
      if (!person.image) {
        person.image =
          'https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png';
      }

      this.person = person;

      this.form.setValue({
        name: person.name,
        email: person.email,
        password: person.password,
      });
    });
  }

  save() {
    confirm('Are you sure you want to make this changes?');
    const { controls } = this.form;

    const body = {
      name: controls.name.value,
      email: controls.email.value,
      password: controls.password.value,
    };

    this.httpService.update(ADMINS_URL, this.person.id, body).subscribe(
      () => {
        this.alertService.success(`Updates has succesfully saved.`);
      },
      ({ error }) =>
        this.alertService.error(`Error: ${error.error}. ${error.message}`)
    );
  }
}
