import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ParentApiService } from 'src/app/service/Parentapi.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(private parentapi:ParentApiService ,private http:HttpClient) { 

  }
  // baseurl:string="https://customer-complaint-portal.onrender.com"
  baseurl:string = "http://localhost:5000"
  changecollapse(){
    this.parentapi.navbarcollapse.subscribe((data:any)=>{
      if(data == true){
      }
      else if(data == false)
      {
        this.parentapi.logincollapsenavbar();
      }
    })
  }
  getUserDetail(id:any){
    return this.http.get(`${this.baseurl}/dashboard/${id}`)
  }
  getreview(){
    return this.http.get(`${this.baseurl}/review/get`)
  }
  addreview(username:any,notes:any,role:any){
    const body={
      username:username,
      notes:notes,
      role:role
    }
    return this.http.post(`${this.baseurl}/review/add`,body)
  }
  registerticket(file:File,formData:FormData){
    // const body={
    //   username:username,
    //   firstname:firstname,
    //   lastname:lastname,
    //   email:email,
    //   phonenumber1:phone1,
    //   phonenumber2:phone2,
    //   address:address,
    //   pincode:pincode,
    //   state:state,
    //   brand:brand,
    //   serialnumber:serialnumber,
    //   purchasedate:purchasedate,
    //   invoiceno:invoice,
    //   productdescription:productdescription,
    //   complainttype:complaintType,
    //   damagephoto:damagephoto
    // }
    formData.append('damagephoto',file)
    return this.http.post(`${this.baseurl}/ticket/register`,formData)
    
  }
  getticket(id:any){
    return this.http.get(`${this.baseurl}/ticket/get/${id}`)
  }
  viewticket(id:any){
    return this.http.get(`${this.baseurl}/ticket/view/${id}`)
  }
  getinternaldetails(){
    return this.http.get(`${this.baseurl}/internal/get`)
  }
  assignticket(id:any,username:any){
    const body={
      username:username
    }
    return this.http.post(`${this.baseurl}/internal/assign/${id}`,body)
  }
  getalluserdata(id:any){
    return this.http.get(`${this.baseurl}/user/allget/${id}`)
  }
  getuserdetails(id:any){
    return this.http.get(`${this.baseurl}/user/getdetails/${id}`)
  }
  updateuserdetails(id:any,username:any,email:any,phonenumber:any,password:any,role:any){
    const body={
      _id:id,
      username:username,
      email:email,
      phonenumber:phonenumber,
      password:password,
      role:role
    }
    return this.http.post(`${this.baseurl}/user/updatedetails`,body)
  }
  deleteticket(id:any){
    return this.http.delete(`${this.baseurl}/ticket/deleteuserticket/${id}`)
  }
  deleteuser(id:any){
    return this.http.delete(`${this.baseurl}/user/delete/${id}`)
  }
  closeticket(id:any){
    return this.http.delete(`${this.baseurl}/ticket/closeticket/${id}`)
  }
  solvedcomplaint(id:any){
    return this.http.get(`${this.baseurl}/ticket/solved/${id}`)
  }
  sendmessagetoticket(id:any,username:any,message:any){
    const body={
      id,
      username,
      message
    }
    return this.http.post(`${this.baseurl}/ticket/message`,body)
  }
}
