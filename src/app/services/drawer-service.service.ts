import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawerServiceService {

  private toggleDrawerSource = new Subject<void>();
  toggleDrawer$ = this.toggleDrawerSource.asObservable();
  
  constructor() { }

  toggleDrawer() {
    this.toggleDrawerSource.next();
  }
}
