import { REQUEST_URL, ROOMS_URL, USERS_URL } from '../../shared/constants';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { HttpService } from 'src/app/shared/http.service';
import { Request, Admin } from '../../shared/http.service';
import { EventsEmitter } from 'src/app/shared/events.service';
import { AlertService } from './../../components/alert/alert.service';
import { getPerson, Role, sortByDate } from 'src/app/shared/helpers';
import { FormGroup, FormControl } from '@angular/forms';

const initialSearch = {
  id: false,
  title: false,
  description: false,
  creator: false,
};

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
})
export class RequestsComponent implements OnInit {
  public requests: Request[] = [];
  public request: Request;
  public admin: Admin;
  public searchInputs: FormGroup;
  public showField = { ...initialSearch };

  constructor(
    private httpService: HttpService,
    private eventsEmitter: EventsEmitter,
    private alertServive: AlertService
  ) {}

  ngOnInit(): void {
    this.eventsEmitter.title.emit('Requests');
    this.eventsEmitter.route.emit('/requests');

    this.find();

    this.searchInputs = new FormGroup({
      id: new FormControl(''),
      title: new FormControl(''),
      description: new FormControl(''),
      creator: new FormControl(''),
      createdAt: new FormControl(''),
    });
  }

  find() {
    if (getPerson().role !== Role.USER) {
      this.httpService.find(REQUEST_URL).subscribe((requests) => {
        this.requests = requests;
      });
    } else {
      this.httpService
        .find(`${REQUEST_URL}/${USERS_URL}/${getPerson().id}`)
        .subscribe((requests) => {
          this.requests = requests;
        });
    }
  }

  findOne(id: string) {
    if (getPerson().role !== Role.USER) {
      this.eventsEmitter.id.emit(id);
      this.admin = null;
      this.httpService.findOne(REQUEST_URL, id).subscribe((request) => {
        this.request = request;
      });
    }
  }

  createRoom(data: any) {
    this.httpService.create(ROOMS_URL, data).subscribe((room) => {});
    this.httpService.deleteOne(REQUEST_URL, this.request.id).subscribe(
      (d) => {
        this.alertServive.success(`Room has successfully created`);
        this.requests = this.requests.filter(
          (request) => request.id !== this.request.id
        );
      },
      ({ error }) => this.alertServive.error(`Error: Something went wrong.`)
    );
    this.request = null;
  }

  setAdmin(admin) {
    this.admin = admin;
  }

  search(field: string) {
    const { controls } = this.searchInputs;

    if (!this.showField[field]) {
      this.showField = { ...initialSearch };
      this.showField[field] = true;
    } else if (this.showField[field] && !controls[field].value) {
      this.showField[field] = false;
    }

    sortByDate(controls);

    if (controls[field].value) {
      this.httpService
        .queryBuilder(REQUEST_URL, `${field}=${controls[field].value}`)
        .subscribe((reqs) => (this.requests = reqs));
    } else {
      this.find();
    }
  }
}
