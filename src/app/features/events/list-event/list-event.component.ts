import { Component, OnInit } from '@angular/core';
import { Event } from '../../../models/eventy';
import { EventsService } from '../../../shared/data/events.service';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.css']
})
export class ListEventComponent implements OnInit {  
  events: Event[] = [];
  today: Date = new Date(); 
  searchTerm: string = '';

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  // ✅ CHARGER AVEC OBSERVABLE
  loadEvents(): void {
    this.eventsService.getAllEvents().subscribe({
      next: (data) => {
        this.events = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement:', error);
      }
    });
  }

  get filteredEvents(): Event[] {
    const q = this.searchTerm.trim().toLowerCase();
    return !q ? this.events : this.events.filter(e =>
      e.title.toLowerCase().includes(q) || e.location.toLowerCase().includes(q)
    );
  }

  isExpired(e: Event): boolean {
    return e.date < this.today;
  }

  // ✅ LIKE AVEC OBSERVABLE
  like(e: Event): void {
    if (this.isExpired(e)) return;
    
    this.eventsService.likeEvent(e.id).subscribe({
      next: () => {
        this.loadEvents(); // Recharger après like
      },
      error: (error) => {
        console.error('Erreur like:', error);
      }
    });
  }

  // ✅ SUPPRIMER AVEC OBSERVABLE
  deleteEvent(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
      this.eventsService.deleteEvent(id).subscribe({
        next: () => {
          this.loadEvents(); // Recharger après suppression
        },
        error: (error) => {
          console.error('Erreur suppression:', error);
        }
      });
    }
  }

  // ✅ RÉSERVER AVEC OBSERVABLE
  reservePlace(e: Event): void {
    if (this.isExpired(e)) {
      alert('Événement expiré !');
      return;
    }
    if (e.nbPlaces <= 0) {
      alert('Plus de places disponibles !');
      return;
    }
    
    this.eventsService.reservePlace(e.id).subscribe({
      next: () => {
        this.loadEvents(); // Recharger après réservation
        alert('Place réservée avec succès !');
      },
      error: (error) => {
        console.error('Erreur réservation:', error);
      }
    });
  }

  // ✅ MODIFIER AVEC OBSERVABLE
  updateEvent(updatedEvent: Event): void {
    this.eventsService.updateEvent(updatedEvent.id, updatedEvent).subscribe({
      next: () => {
        this.loadEvents(); // Recharger après modification
      },
      error: (error) => {
        console.error('Erreur modification:', error);
      }
    });
  }
}