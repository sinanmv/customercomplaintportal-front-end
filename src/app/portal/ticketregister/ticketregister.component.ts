import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticketregister',
  templateUrl: './ticketregister.component.html',
  styleUrls: ['./ticketregister.component.css']
})
export class TicketregisterComponent  implements OnInit{
key:any= 0
username:String = ""
alertdata:any = ""
  constructor(private registerFb:FormBuilder,private api:ApiService,private route:Router){}
  ngOnInit(): void {
    this.api.changecollapse()
    this.key = localStorage.getItem("key")
    this.api.getUserDetail(this.key).subscribe((result:any)=>{
      this.username = result.username;
      // this.role = result.role
     })
  }

  registerForm= this.registerFb.group({
    // array
    firstName:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    lastName:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    email:['',[Validators.required,Validators.pattern('[a-zA-Z0-9@.]*')]],
    phone1 :['',[Validators.required,Validators.pattern('[0-9]*')]],
    phone2:[''],
    address:['',[/*Validators.required*/,Validators.pattern('[a-zA-Z 0-9,]*')]],
    pincode:['',[Validators.required,Validators.pattern('[0-9]*')]],
    state:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    brand:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    serialnumber:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    purchasedate:['',[Validators.required]],
    invoice:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    productdescription:[''],
    complaintType:[''],
    damagephoto:[null] 
   })

   onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.registerForm.get('damagephoto')!.setValue(file);
    }
    console.log(this.registerForm.value.damagephoto);
    
  }

   register(){
    console.log(this.registerForm.value);
    
    if(this.registerForm.valid){
      // let username = this.username
      // let firstname = this.registerForm.value.firstName
      // let lastname = this.registerForm.value.lastName
      // let email = this.registerForm.value.email
      // let phone1 = this.registerForm.value.phone1
      // let phone2 = this.registerForm.value.phone2
      // let address = this.registerForm.value.address
      // let pincode = this.registerForm.value.pincode
      // let state = this.registerForm.value.state
      // let brand = this.registerForm.value.brand
      // let serialnumber = this.registerForm.value.serialnumber
      // let purchasedate = this.registerForm.value.purchasedate
      // let invoice = this.registerForm.value.invoice
      // let productdescription = this.registerForm.value.productdescription
      // let complaintType = this.registerForm.value.complaintType
      // let damagephoto = this.registerForm.value.damagephoto
      const formData = new FormData();
      const username = this.username
      const firstname = this.registerForm.get('firstName')?.value || '';
      const lastname = this.registerForm.get('lastName')?.value || '';
      const email = this.registerForm.get('email')?.value || '';
      const phone1 = this.registerForm.get('phone1')?.value || '';
      const phone2 =  this.registerForm.get('phone2')?.value || '';
      const address =  this.registerForm.get('address')?.value || '';
      const pincode =  this.registerForm.get('pincode')?.value || '';
      const state =  this.registerForm.get('state')?.value || '';
      const brand =  this.registerForm.get('brand')?.value || '';
      const serialnumber =  this.registerForm.get('serialnumber')?.value || '';
      const purchasedate = this.registerForm.get('purchasedate')?.value || '';
      const invoice = this.registerForm.get('invoice')?.value || '';
      const productdescription = this.registerForm.get('productdescription')?.value || '';
      const complaintType = this.registerForm.get('complaintType')?.value || '';
      formData.append('username', username.toString());
      formData.append('firstname', firstname);
      formData.append('lastname', lastname);
      formData.append('email', email);
      formData.append('phonenumber1', phone1);
      formData.append('phonenumber2', phone2);
      formData.append('address', address.toString());
      formData.append('pincode', pincode);
      formData.append('state', state);
      formData.append('brand', brand);
      formData.append('serialnumber', serialnumber);
      formData.append('purchasedate', purchasedate);
      formData.append('invoiceno', invoice);
      formData.append('productdescription', productdescription);
      formData.append('complainttype', complaintType);

      const damagePhotoControl = this.registerForm.get('damagephoto');
      console.log("damagephotocontrol", damagePhotoControl);
  
      const damagephoto: File | null = damagePhotoControl ? (damagePhotoControl.value as unknown as File) : null;
      console.log("damagephoto", damagephoto);
      
      if (damagephoto) {
        this.api.registerticket(damagephoto,formData).subscribe((result:any)=>{
          console.log(result)
          this.alertdata = result
          setTimeout(()=>{
            this.alertdata = ""
            this.registerForm.reset()
            
            this.route.navigateByUrl('/home')
          
          },1500)
        },(result:any)=>{
          this.alertdata = result.error
          console.log(result.error)
          setTimeout(()=>{
            this.alertdata = ""
            this.registerForm.reset()
          },1500)
        })
        
      }else{
        console.log("file not selected ");
        
      }
      }
    else{
      this.alertdata = "Invalid Form"
      console.log(this.registerForm);
      setTimeout(() => {
        this.alertdata = ""
        this.registerForm.reset()
      }, 1500);
    }
   }

}
