import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'customercomplaintportal';
  navbarCollapseStatus = false
  sidebar:boolean=false
  sidebartoggle(){
    this.sidebar = !this.sidebar
  }
  navbarcollapse(){
    console.log(
      "worked"
    );
    
    this.navbarCollapseStatus = !this.navbarCollapseStatus
  }
}
