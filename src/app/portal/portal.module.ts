import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortalRoutingModule } from './portal-routing.module';
import { PortalComponent } from './portal.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewTicketComponent } from './view-ticket/view-ticket.component';
import { TicketregisterComponent } from './ticketregister/ticketregister.component';
import { FooterComponent } from '../footer/footer.component';
import { ViewComponent } from './view/view.component';
import { UserdataComponent } from './userdata/userdata.component';
import { ViewuserComponent } from './viewuser/viewuser.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DeleteComponent } from './delete/delete.component';


@NgModule({
  declarations: [
    PortalComponent,
    DashboardComponent,
    ViewTicketComponent,
    TicketregisterComponent,
    ViewComponent,
    UserdataComponent,
    ViewuserComponent,
    DeleteComponent
  ],
  imports: [
    CommonModule,
    PortalRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule
    

  ]
})
export class PortalModule { }
