import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ParentApiService } from '../service/Parentapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  collapsestatus:Boolean = false
  alertdata:any = ""
 constructor(private loginFb:FormBuilder,private api:ParentApiService,private route:Router){
  // localStorage.clear()
 }
 @Output() toggle = new EventEmitter()
  ngOnInit(): void {
    if(localStorage.getItem("key")){

      this.subscription =  this.api.navbarcollapse.subscribe((data:any)=>{
      this.collapsestatus = data
      })
      if(this.collapsestatus == true){
        this.api.logoutcollapsenavbar()
      }
    }
    else{
      this.api.logoutcollapsenavbar()
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
 loginForm= this.loginFb.group({
  // array
  username:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
  password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
 })

 login(){
  if(this.loginForm.valid){
    let username = this.loginForm.value.username
    let password = this.loginForm.value.password
    this.api.login(username,password).subscribe((result:any)=>{
      this.alertdata = "Login successfully"
      setTimeout(() => {
        
        this.loginForm.reset()
        console.log(result);
        localStorage.setItem("key",result)
         this.api.logincollapsenavbar()
         console.log("login");
         this.api.userstatuschange(result)
         this.route.navigateByUrl('/home')
      }, 1500);
    },(result:any)=>{
      this.alertdata = result.error
      setTimeout(()=>{
        this.loginForm.reset()
        this.alertdata = ""
      },1500)
      // console.log(result.error)
    }
    )
  }
 else{
  this.alertdata = "Please Enter Valid Data"
 console.log('invalid form')
 setTimeout(() => {
  this.loginForm.reset()
  this.alertdata = ""
 }, 1500);
 }
}
}
