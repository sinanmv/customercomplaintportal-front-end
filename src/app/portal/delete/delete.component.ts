import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent  implements OnInit{
  alertdata:any = ""
  key:any = ""
  pswd:any = ""
  constructor(private route:Router,private api:ApiService){}
  ngOnInit(): void {
    this.api.changecollapse()
    this.key = localStorage.getItem("key")
    if(!this.key){
      alert("Please login")
      this.route.navigateByUrl('/')
    }
    
  }
  deleteaccount(){
    this.api.getUserDetail(this.key).subscribe((result:any)=>{
      if(result.password == this.pswd){
        this.api.deleteticket(this.key).subscribe((result:any)=>{
          this.api.deleteuser(this.key).subscribe((result:any)=>{
            console.log(result);
            this.alertdata = "user deleted successfully"
            setTimeout(() => {
              this.alertdata = ""
              this.route.navigateByUrl('/')
            }, 1500);
            
          },(result:any)=>
          {
            this.alertdata = result.error
            setTimeout(() => {
              this.alertdata = ""
            }, 1500);
            //delete user error
            
          })
        },(result:any)=>{
          this.alertdata = result.error
          setTimeout(() => {
            this.alertdata = ""
          }, 1500);
          //delete ticket error
          
        })
      }
      else{
        this.alertdata = "password incorrect"
        setTimeout(() => {
          this.alertdata = ""
        }, 1500);
      }
    },(result:any)=>{
      this.alertdata = "Invalid User id"
      setTimeout(() => {
        this.alertdata = ""
        this.route.navigateByUrl('/login')
        localStorage.clear()
      }, 1500);
      // console.log("Invalid User id");
    })
  }

}
