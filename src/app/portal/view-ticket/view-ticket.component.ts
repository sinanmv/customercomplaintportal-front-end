import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.css']
})
export class ViewTicketComponent implements OnInit {
  key:any = ""
  viewticketdata:any = []
  constructor(private api:ApiService){}
  ngOnInit(): void {
    this.api.changecollapse()
    this.key = localStorage.getItem("key")
    this.api.getticket(this.key).subscribe((result:any)=>{
      console.log(result);
      this.viewticketdata = result
      
    },(result:any)=>{
      console.log(result.error)
    })
  }
 
}
