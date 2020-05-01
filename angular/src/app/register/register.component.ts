import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'; //imported auth service
//import { observable } from 'rxjs';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router } from '@angular/router'; //imported router for navigate to login form

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username:string;
  name:string;
  email:string;
  password:string;

  constructor(
    private authservice:AuthService, //added auth service
    private flashmessage:NgFlashMessageService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  registerData(){
    const user={
      username:this.username,
      name:this.name,
      email:this.email,
      password:this.password
    }
    //console.log(user);
    this.authservice.adduser(user).subscribe(res=>{
      //console.log(res);
      if(res.state){
        this.flashmessage.showFlashMessage({
          messages: [res.msg],
          dismissible: false,
          timeout: 2000,
          type: 'success'
        });
        this.router.navigate(['./login']);
      }
      else{
        this.flashmessage.showFlashMessage({
          messages: [res.msg],
          dismissible: false,
          timeout: 2000,
          type: 'warning'
        });
        this.router.navigate(['./home']);
      }
    }); //passed the object to auth service
  }

}
