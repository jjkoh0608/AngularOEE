import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MachineSetupComponent } from './machine-setup/machine-setup.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GaugeComponent } from './gauge/gauge.component';

const routes: Routes = [
  { path: '', component: NavbarComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'setup', component: MachineSetupComponent },
  { path: 'gauge', component: GaugeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
