import { NEW_MESSAGE, SEND_MESSAGE } from './constants';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Message } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  constructor(private socket: Socket) {}

  emit(event: string, body: any) {
    this.socket.emit(event, body);
  }

  on(event: string) {
    return Observable.create((observer) => {
      this.socket.on(event, (data) => {
        observer.next(data);
      });
    });
  }
}
