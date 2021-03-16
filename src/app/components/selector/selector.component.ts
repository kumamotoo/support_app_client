import { HttpService, User } from 'src/app/shared/http.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { USERS_URL } from 'src/app/shared/constants';
import { Role } from 'src/app/shared/helpers';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss'],
})
export class SelectorComponent implements OnInit {
  public admins: User[] = [];
  @Output() admin: EventEmitter<User> = new EventEmitter<User>();

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.find();
  }

  find() {
    this.httpService
      .findWhere(USERS_URL, `role=!${Role.USER}`)
      .subscribe((admins) => {
        this.admins = admins;
      });
  }

  select(id: string) {
    console.log(id);
    this.httpService.findOne(USERS_URL, id).subscribe((admin) => {
      this.admin.emit(admin);
    });
  }
}
