import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ParentApiService } from 'src/app/service/Parentapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  constructor(private api:ApiService,private parentapi:ParentApiService,private route:Router){

  }
  loadingstatus:boolean = true
  reviewlength:number = 0
  username:String = ""
  reviewlimit:any = 3
  showmorebuttonstatus:Boolean=true
  key:any = ""
  role:any = ""
  reviewdata:any=[]
  reviewnotes:String=""
  ngOnInit(): void {
    setTimeout(() => {
      
      this.key = localStorage.getItem("key")
      if(this.key){
  
        this.api.changecollapse()
        this.parentapi.userstatuschange(this.key)
         this.api.getUserDetail(this.key).subscribe((result:any)=>{
          this.username = result.username;
          this.role = result.role
         })
         this.api.getreview().subscribe((result:any)=>{
          this.reviewdata = result
          console.log(result);
           this.reviewlength = Object.keys(this.reviewdata).length;
           if (this.reviewlength <=3) {
          
            this.showmorebuttonstatus = false;
          }
          
         })
        
         
         
      }
      else{
        alert("please login")
        this.route.navigateByUrl('/')
      }
      this.loadingstatus = false
    }, 1000);
    
  }
  addreview(){
    console.log(this.reviewnotes);
    this.api.addreview(this.username,this.reviewnotes,this.role).subscribe((result:any)=>{
      this.reviewdata = result 
      this.reviewlength = Object.keys(this.reviewdata).length;
      if (this.reviewlength >3) {
          
        this.showmorebuttonstatus = true;
      }
    })

    
  }
  showmore(){
    this.reviewlimit += 3
    this.showmorebuttonstatus = false
  }
  

}
