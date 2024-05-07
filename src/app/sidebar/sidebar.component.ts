import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ParentApiService } from '../service/Parentapi.service';
import { Router } from '@angular/router';
import { NavbarComponent} from '../navbar/navbar.component'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userviewstatus:Boolean = false
  constructor(private api:ParentApiService,private route:Router){
    
  }
  ngOnInit(): void {
    this.api.userdatastatus.subscribe((result:any)=>{
      this.userviewstatus = result
      
      console.log(this.userviewstatus);
    })
    const key = localStorage.getItem('key')
    if(key){
      this.api.userstatuschange(key)
    }
     
  }
@Output() toggle = new EventEmitter()
  sidebartoggle(){
    this.toggle.emit()
  }
}
