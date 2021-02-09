import { Admin, HttpService } from 'src/app/shared/http.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss'],
})
export class SelectorComponent implements OnInit {
  public admins: Admin[] = [];
  @Output() admin: EventEmitter<Admin> = new EventEmitter<Admin>();

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.find();
  }

  find() {
    this.httpService.find('admin').subscribe((admins) => {
      this.admins = admins;
    });
  }

  select(id: string) {
    console.log(id);
    this.httpService.findOne('admin', id).subscribe((admin) => {
      this.admin.emit(admin);
    });
  }
}
