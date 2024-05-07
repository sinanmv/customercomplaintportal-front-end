import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.css']
})
export class ViewuserComponent implements OnInit {
  alertdata:any = ""
  id:any = ""
  userdata:any={}
  constructor(private api:ApiService,private route:ActivatedRoute,private router:Router){}
  ngOnInit(): void {
    this.api.changecollapse()
    this.id  = this.route.params
    this.id.subscribe((data:any)=>{
      this.id = data.id
    })
    this.api.getuserdetails(this.id).subscribe((result:any)=>{
      console.log(result);
      this.userdata = result
      
    })
    console.log(this.id)
  }

  submitchange(){
    let id = this.userdata._id
    let username = this.userdata.username
    let email = this.userdata.email
    let phone = this.userdata.phonenumber
    let password = this.userdata.password
    let role = this.userdata.role
    this.api.updateuserdetails(id,username,email,phone,password,role).subscribe((result:any)=>{
      this.alertdata = "updated Successfully"
      setTimeout(() => {
        this.alertdata = ""
        this.userdata = result  
      }, 1500);
    },(result:any)=>{
      this.alertdata = result.error
      setTimeout(() => {
        this.alertdata = ""
        this.ngOnInit()
      }, 1500);
    })
    
  }
  deleteaccount(){
    let id = this.userdata._id
    this.api.deleteuser(id).subscribe((result:any)=>{
      this.alertdata = "Deleted Succesfully"
      setTimeout(() => {
        this.alertdata = ""
        this.router.navigateByUrl('/home')
      }, 1500);
      
    },(result:any)=>{
      this.alertdata = result.error
      // alert(result.error)
      setTimeout(() => {
        this.alertdata = ""
      }, 1500);
    })

  }
}
