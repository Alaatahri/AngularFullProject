import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Event} from '../../../models/eventy';

@Component({
  selector: 'app-card-event',
  templateUrl: './card-event.component.html',
  styleUrl: './card-event.component.css'
})
export class CardEventComponent {
  searchValue: string;
  @Input() e:Event;
  @Output() notificationLike:EventEmitter<Event>
    = new EventEmitter();
  likeEvent(e:Event) {
    this.notificationLike.emit(e);
  }
  nbrPlaceDecr(e:Event) {}
}
