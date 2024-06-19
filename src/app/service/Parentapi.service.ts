import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParentApiService {
navbarcollapse = new BehaviorSubject(false) 
userdatastatus = new BehaviorSubject(false)
 baseurl:string="https://customer-complaint-portal.onrender.com"
 //baseurl:string="http://localhost:5000"
constructor(private http:HttpClient) { }

  logincollapsenavbar(){
    this.navbarcollapse.next(true)
    
  }
  logoutcollapsenavbar(){
    this.navbarcollapse.next(false)
  }
  adduser(username:any,email:any,phonenumber:any,password:any){
    const body={
      username,
      email,
      phonenumber,
      password
    }
    return this.http.post(`${this.baseurl}/adduser`,body);
  }

  login(username:any,password:any){
    const body={
      username,
      password
    }
    return this.http.post(`${this.baseurl}/login`,body);
  }
  userstatuschange(id:any){
    if(id==""){
      this.userdatastatus.next(false)
    }
    else{

      const user = this.http.get(`${this.baseurl}/dashboard/${id}`)
      user.subscribe((result:any)=>{
        if(result.role == "admin"){
          this.userdatastatus.next(true)
        }
      })
    }
  }
  deleteticket(id:any){
    return this.http.delete(`${this.baseurl}/ticket/deleteuserticket/${id}`)
  }
  deleteuser(id:any){
    return this.http.delete(`${this.baseurl}/user/delete/${id}`)
  }
  
}
