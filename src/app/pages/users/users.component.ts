import { FormGroup, FormControl } from '@angular/forms';
import { HttpService, User } from '../../shared/http.service';
import { Component, OnInit } from '@angular/core';
import { EventsEmitter } from 'src/app/shared/events.service';
import { ROOMS_URL, USERS_URL } from 'src/app/shared/constants';
import { sortByDate } from 'src/app/shared/helpers';

const initialSearch = {
  name: false,
  email: false,
};

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public users: User[] = [];
  public user: User;
  public userRooms: any = [];
  public showField = { ...initialSearch };
  public searchInputs: FormGroup;

  constructor(
    private httpService: HttpService,
    private eventsEmitter: EventsEmitter
  ) {}

  ngOnInit(): void {
    this.eventsEmitter.title.emit('Users');
    this.eventsEmitter.route.emit('/users');
    this.find();

    this.searchInputs = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
    });
  }

  find() {
    this.httpService.find(USERS_URL).subscribe((users) => {
      this.users = users;
    });
  }

  findOne(id: string) {
    this.eventsEmitter.id.emit(id);
    this.findRoomsByUser(id);
    this.httpService.findOne(USERS_URL, id).subscribe((user) => {
      this.user = user;
    });
  }

  findRoomsByUser(id: string) {
    this.httpService
      .findOne(`${ROOMS_URL}/${USERS_URL}`, id)
      .subscribe((userRooms) => {
        this.userRooms = userRooms;
      });
  }

  search(field: string) {
    const { controls } = this.searchInputs;

    if (!this.showField[field]) {
      this.showField = { ...initialSearch };
      this.showField[field] = true;
    } else if (this.showField[field] && !controls[field].value) {
      this.showField[field] = false;
    }

    if (controls[field].value) {
      this.httpService
        .queryBuilder(USERS_URL, `${field}=${controls[field].value}`)
        .subscribe((users) => (this.users = users));
    } else {
      this.find();
    }
  }
}
