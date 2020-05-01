import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'; //imported auth service
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router } from '@angular/router'; //imported router for navigate to login form

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string;
  password:string;

  constructor(
    private authservice:AuthService, //added auth service
    private flashmessage:NgFlashMessageService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  loginData(){
    const user={
      email:this.email,
      password:this.password
    }
    //console.log(user);
    this.authservice.loguser(user).subscribe(res=>{
      //console.log(res);
      if(res.state){
        this.flashmessage.showFlashMessage({
          messages: [res.msg],
          dismissible: false,
          timeout: 2000,
          type: 'success'
        });
        this.authservice.storeuser(res.token);
        this.router.navigate(['./profile']);
      }
      else{
        this.flashmessage.showFlashMessage({
          messages: [res.msg],
          dismissible: false,
          timeout: 2000,
          type: 'warning'
        });
        this.router.navigate(['./login']);
      }

    }); //passed the object to auth service
  }

}
