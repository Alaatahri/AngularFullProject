import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EventsService} from '../../../shared/data/events.service';
import {Event} from '../../../models/eventy';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styleUrl: './detail-event.component.css'
})
export class DetailEventComponent implements OnInit {
   currentEvent:Event | null = null;
  constructor(private route: ActivatedRoute,
              private eventService:EventsService) {
  }
  ngOnInit() {
   let id= this.route.snapshot.params['id'];
   this.eventService.getEventById(id).subscribe({
     next: (event) => {
       this.currentEvent = event;
     },
     error: (error) => {
       console.error('Erreur lors du chargement de l\'événement:', error);
     }
   });
  }

}
