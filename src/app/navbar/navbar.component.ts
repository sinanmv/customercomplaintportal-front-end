import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ParentApiService } from '../service/Parentapi.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  key:any = localStorage.getItem('key')
  collapseicon:boolean = false
  @Output() toggle = new EventEmitter()
  constructor(private api:ParentApiService, private route:Router) { }
  ngOnInit(): void {
    
    this.api.navbarcollapse.subscribe((data:any)=>{
      this.collapseicon = data
    })

    if(this.key == "" && this.collapseicon == true){
      this.api.logoutcollapsenavbar()
      this.ngOnInit
      
    }
    
  }
  menuIconClick(){
    this.toggle.emit()
  }
  logout(){
    localStorage.clear()
    this.api.logoutcollapsenavbar()
    this.api.userstatuschange('')
    this.ngOnInit()
    this.route.navigateByUrl('/')
  }
}
