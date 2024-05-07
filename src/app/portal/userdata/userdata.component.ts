import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.css']
})
export class UserdataComponent  implements OnInit{
  key:any = ""
  userdata:any=[]
  constructor(private api:ApiService){}
  ngOnInit(): void {
    this.api.changecollapse()
    this.key  = localStorage.getItem('key')
    this.api.getalluserdata(this.key).subscribe((result:any)=>{
      this.userdata = result
      
      
    })
  }
}
