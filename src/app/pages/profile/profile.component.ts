import { Params } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EventsEmitter } from './../../shared/events.service';
import { HttpService, User } from 'src/app/shared/http.service';
import { AlertService } from './../../components/alert/alert.service';
import { USERS_URL } from 'src/app/shared/constants';
import { getUser, isMatchPasswords, Role } from 'src/app/shared/helpers';

type Payload = {
  email?: string;
  password?: string;
  name?: string;
  image?: string;
};

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public user: User;
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
    this.id = getUser().id;
    this.eventsEmitter.id.emit(this.id);

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });

    this.findOne(this.id);
  }

  findOne(id: string) {
    this.httpService.findOne(USERS_URL, id).subscribe((user) => {
      this.user = user;

      this.form.setValue({
        name: user.name,
        email: user.email,
        password: user.password,
      });
    });
  }

  save() {
    const confirmed = confirm('Are you sure you want to make this changes?');

    if (!confirmed) {
      return;
    }

    const { controls } = this.form;

    let body: Payload = {
      name: controls.name.value,
      email: controls.email.value,
      image: this.user.image,
    };

    if (!isMatchPasswords(controls.password.value, this.user.password)) {
      body = { ...body, password: controls.password.value };
    }

    this.httpService.update(USERS_URL, this.user.id, body).subscribe(
      () => {
        this.alertService.success(`Updates has succesfully saved.`);
      },
      ({ error }) =>
        this.alertService.error(`Error: ${error.error}. ${error.message}`)
    );
  }

  onUpload(event: any) {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.user.image = event.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }
}
