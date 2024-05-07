import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewTicketComponent } from './view-ticket/view-ticket.component';
import { TicketregisterComponent } from './ticketregister/ticketregister.component';
import { ViewComponent } from './view/view.component';

import { ViewuserComponent } from './viewuser/viewuser.component';
import { UserdataComponent } from './userdata/userdata.component';
import { DeleteComponent } from './delete/delete.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent
  },
  {
    path: 'register', component: TicketregisterComponent
  },
  {
    path: 'viewticket', component: ViewTicketComponent
  },
  {
    path: 'viewticket/view/:id', component: ViewComponent
  },
  {
    path: 'userdetails', component: UserdataComponent
  },
  {
    path: 'userdetails/edit/:id', component: ViewuserComponent
  },
  {
    path: 'deleteaccount', component: DeleteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRoutingModule { }
