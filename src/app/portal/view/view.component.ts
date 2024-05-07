import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  alertdata:any = ""
  id:any = ""
  ticketdetails:any=[]
  messagedata:any =""
  internaldetails:any = []
  internalvalue:any = ""
  key:any = ""
  username:String = ""
  imagedata:File | undefined 
  role:String = ""
  constructor(private activeroute:ActivatedRoute,private api:ApiService,private route:Router){}
  ngOnInit(): void {
    this.key = localStorage.getItem('key')
    this.api.changecollapse()
    
   this.id = this.activeroute.params
   this.api.getUserDetail(this.key).subscribe((result:any)=>{
    this.username = result.username;
    this.role = result.role
   })
   console.log(this.id.value);
   this.api.viewticket(this.id.value.id).subscribe((result:any)=>{
    this.ticketdetails = result
    console.log(this.ticketdetails);
    
   })
  }
  getinterndetails(){
    this.api.getinternaldetails().subscribe((result:any)=>{

      this.internaldetails = result 
    })
  }
  assigntointernal(){
    this.api.assignticket(this.ticketdetails._id,this.internalvalue).subscribe((result:any)=>{
      this.alertdata =` Assigned to ${this.internalvalue} successfully`
      setTimeout(() => {
        this.ticketdetails = result 
        this.alertdata = ""
      }, 1500);
      
    },(result:any)=>{
      console.log(result.error);
      
    })
    
  }
  ticketclose(){
    let id = this.ticketdetails._id
    this.api.closeticket(id).subscribe((result:any)=>{
      this.alertdata = result
      setTimeout(() => {
        this.alertdata = ""
        this.route.navigateByUrl('/home')
      }, 1500);
    },(result:any)=>{
      this.alertdata = result.error
      setTimeout(() => {
        this.alertdata = ""
      }, 1500);
      console.log(result.error)
    })
  }
  solved(){
    let id = this.ticketdetails._id
    this.api.solvedcomplaint(id).subscribe((result:any)=>{
      this.alertdata = result
      setTimeout(() => {
      this.alertdata = ""   
        this.route.navigateByUrl('/home')
      }, 1500);
    },(result:any)=>{
      this.alertdata = result.error
      setTimeout(() => {
        this.alertdata = ""
      }, 1500);
      console.log(result.error)
    })
  }
  sendmessage(){
    console.log(this.messagedata);
    this.api.sendmessagetoticket(this.ticketdetails._id,this.username,this.messagedata).subscribe((result:any)=>{
      this.ticketdetails = result
      this.alertdata="message sent"
      setTimeout(() => {
        this.alertdata = ""
      }, 1500);
    })
    
  }
  

}
