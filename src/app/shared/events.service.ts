import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventsEmitter {
  @Output() title: EventEmitter<string> = new EventEmitter<string>();
  @Output() id: EventEmitter<string> = new EventEmitter<string>();
  @Output() route: EventEmitter<string> = new EventEmitter<string>();

  getEmittedValue() {
    return {
      title: this.title,
      id: this.id,
      route: this.route,
    };
  }
}
