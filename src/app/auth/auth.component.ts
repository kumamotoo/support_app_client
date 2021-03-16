import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { HttpService } from 'src/app/shared/http.service';
import { AlertService } from './../components/alert/alert.service';
import { setUser, setToken } from '../shared/helpers';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  public loginForm: FormGroup;
  public registerForm: FormGroup;
  public isLogin: boolean = true;
  @Output() token: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private httpService: HttpService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });

    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  toLogin(param: boolean) {
    this.isLogin = param;
  }

  submit(url: string) {
    let form: FormGroup = this.isLogin ? this.loginForm : this.registerForm;
    const { controls } = form;
    const { email, password, name } = controls;

    if (email.invalid && (email.dirty || email.touched)) {
      return this.alertService.info(`${email.status} E-MAIL ${email.value}`);
    }

    const payload = {
      name: name?.value,
      email: email.value,
      password: password.value,
    };

    this.httpService.create(url, payload).subscribe(
      (data) => {
        if (data.access_token) {
          this.token.emit(data.access_token);
          setToken(data.access_token);
          setUser(data);
          this.router.navigate(['/']);
        }
      },
      ({ error }) => {
        this.alertService.error(` Error: ${error.error}. ${error.message}`);
      }
    );
  }
}
