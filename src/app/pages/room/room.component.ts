import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { WebsocketService } from 'src/app/shared/socket.service';
import { HttpService, Room } from '../../shared/http.service';
import { SEND_MESSAGE, NEW_MESSAGE, ROOMS_URL } from '../../shared/constants';
import { getPerson } from 'src/app/shared/helpers';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  @ViewChild('scroll') private scroll: ElementRef;
  public messages = [];
  public room: Room;
  public form: FormGroup;
  public person: any;

  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    private wsService: WebsocketService
  ) {}

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.scroll.nativeElement.scrollTop = this.scroll.nativeElement.scrollHeight;
    } catch (err) {}
  }

  ngOnInit(): void {
    this.person = getPerson();

    this.route.params.subscribe((param: Params) => {
      this.loadById(param.id);
    });
    this.form = new FormGroup({
      messageText: new FormControl('', [Validators.required]),
    });

    this.wsService.on(NEW_MESSAGE).subscribe((message: string) => {
      this.messages.push(JSON.parse(message));
    });
  }

  loadById(id: string) {
    this.httpService.findOne(ROOMS_URL, id).subscribe((room) => {
      this.messages = room.messages;
      this.room = room;
    });
  }

  sendMessage() {
    if (this.form.value.messageText.trim()) {
      const message = {
        message: this.form.value.messageText,
        sender: this.person.id,
        admin: this.room.admin,
        room: this.room.id,
      };
      this.wsService.emit(SEND_MESSAGE, message);
      this.form.reset();
    }
  }

  close() {
    const body = {
      open: !this.room.open,
    };

    this.httpService.update(ROOMS_URL, this.room.id, body).subscribe((room) => {
      this.room = room;
    });
  }

  resolve() {
    const body = {
      resolved: !this.room.resolved,
    };

    this.httpService.update(ROOMS_URL, this.room.id, body).subscribe((room) => {
      this.room = room;
    });
  }
}
