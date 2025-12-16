import { Component } from '@angular/core';

@Component({
  selector: 'events-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  search(): void {
    // Filter logic can be implemented here
    console.log('Search triggered');
  }
}
