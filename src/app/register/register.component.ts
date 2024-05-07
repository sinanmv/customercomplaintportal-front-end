import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ParentApiService } from '../service/Parentapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private subscription: Subscription = new Subscription();
alertdata:any = ""
constructor(private RegisterFb:FormBuilder,private api:ParentApiService,private route:Router){

}
ngOnInit(): void {
  this.subscription = this.api.navbarcollapse.subscribe((data: any) => {
    console.log("worked on register");
    console.log(data);

    if (data === true) {
      this.api.logoutcollapsenavbar();
    }
  });
}

ngOnDestroy(): void {
  this.subscription.unsubscribe();
}

registerForm = this.RegisterFb.group({ //form group
  // array
username : ['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
email:['',[Validators.required]],
phonenumber:['',[Validators.required,Validators.pattern('[0-9]*')]],
password : ['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
repassword:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
})

register(){
  if(this.registerForm.valid){
    console.log(this.registerForm.value)
    if(this.registerForm.value.password == this.registerForm.value.repassword)
    {
      let username = this.registerForm.value.username
      let email = this.registerForm.value.email
      let phonenumber = this.registerForm.value.phonenumber
      let password = this.registerForm.value.password

      this.api.adduser(username,email,phonenumber,password).subscribe((result:any)=>{
        this.alertdata = "registered Succesfully"
        setTimeout(() => {
          this.registerForm.reset()
          this.route.navigateByUrl('')
        }, 2000);

      },(result:any)=>{
        this.alertdata = result.error
        console.log(result.error);
        setTimeout(() => {
          this.registerForm.reset()
          this.alertdata = ""
        }, 1500);
        
      })

    }
    else{
      alert("password and Re-password not match")
    }
    
  }
  else
  {
    alert("invalid")
   this.registerForm.reset()
    
  }
}
}
