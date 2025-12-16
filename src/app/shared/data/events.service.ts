import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../../models/eventy';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private urlBackend = 'http://localhost:3000/events/'; // URL de ton backend

  constructor(private http: HttpClient) { }

  // ✅ CREATE - Ajouter un événement
  addEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.urlBackend, event);
  }

  // ✅ READ - Récupérer tous les événements
  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.urlBackend);
  }

  // ✅ READ - Récupérer un événement par ID
  getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(this.urlBackend + id);
  }

  // ✅ UPDATE - Modifier un événement
  updateEvent(id: number, event: Event): Observable<Event> {
    return this.http.put<Event>(this.urlBackend + id, event);
  }

  // ✅ DELETE - Supprimer un événement
  deleteEvent(id: number): Observable<Event> {
    return this.http.delete<Event>(this.urlBackend + id);
  }

  // ✅ RECHERCHE par lieu
  searchByLocation(location: string): Observable<Event[]> {
    return this.http.get<Event[]>(this.urlBackend + '?location=' + location);
  }

  // ✅ LIKE - Ajouter un like
  likeEvent(id: number): Observable<Event> {
    return this.http.patch<Event>(this.urlBackend + id, { nbrLike: 1 });
  }

  // ✅ RÉSERVER - Réserver une place
  reservePlace(id: number): Observable<Event> {
    return this.http.patch<Event>(this.urlBackend + id, { nbPlaces: -1 });
  }
}