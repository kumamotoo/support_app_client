import { filter } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from './../../shared/http.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../shared/http.service';
import { EventsEmitter } from 'src/app/shared/events.service';
import { Room } from 'src/app/shared/http.service';
import { ROOMS_URL, USERS_URL } from 'src/app/shared/constants';
import { Role, getUser, sortByDate, isRoleMatch } from 'src/app/shared/helpers';

const initialSearch = {
  title: false,
  description: false,
};

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit {
  public rooms: Room[] = [];
  public user: any;
  public searchInputs: FormGroup;
  public showField = { ...initialSearch };
  constructor(
    private httpService: HttpService,
    private eventsEmitter: EventsEmitter,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.eventsEmitter.route.emit('/rooms');
    this.eventsEmitter.title.emit('Rooms');
    this.user = getUser();

    if (!isRoleMatch(this.user, Role.USER)) {
      this.find();
    } else {
      this.findRoomsByUser();
    }

    this.searchInputs = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      createdAt: new FormControl('ASC'),
    });
  }

  find() {
    this.eventsEmitter.id.emit('');
    this.httpService.find(ROOMS_URL).subscribe((rooms) => {
      this.rooms = rooms;
    });
  }

  findRoomsByUser() {
    this.httpService
      .findOne(`${ROOMS_URL}/${USERS_URL}`, this.user.id)
      .subscribe((userRooms) => {
        this.rooms = userRooms;
      });
  }

  findOne(id: string) {
    this.eventsEmitter.id.emit(id);
    this.router.navigate(['/rooms', id]);
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
        .queryBuilder(ROOMS_URL, `${field}=${controls[field].value}`)
        .subscribe((rooms) => (this.rooms = rooms));
    } else {
      this.find();
    }
  }
}
