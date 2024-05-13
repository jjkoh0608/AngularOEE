import {Component, ViewChild } from '@angular/core';
import { DrawerServiceService } from '../services/drawer-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {

  constructor(private drawerService: DrawerServiceService) {}


  toggleDrawer() {
    this.drawerService.toggleDrawer();
  }
}
