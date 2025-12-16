import { Component } from '@angular/core';
import {EventsService} from '../../../shared/data/events.service';
import {Event} from '../../../models/eventy';

@Component({
  selector: 'app-formevents',
  templateUrl: './formevents.component.html',
  styleUrl: './formevents.component.css'
})
export class FormeventsComponent {
 eventy:Event = {
   id: 0,
   title: '',
   description: '',
   date: new Date(),
   location: '',
   price: 0,
   organizerId: 0,
   imageUrl: '',
   nbPlaces: 0,
   nbrLike: 0
 };

  today: string = new Date().toISOString().split('T')[0];

  constructor(private dataService:EventsService) {}

  save() {
  // Call your service here
    this.dataService.addEvent(this.eventy).subscribe({
      next: (event) => {
        console.log('Événement ajouté avec succès:', event);
        // Reset form or navigate
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout:', error);
      }
    });
  }

}
