import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'; //imported auth service

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:any;

  constructor(
    private authservice:AuthService, //added auth service
  ) { }

  ngOnInit() {
    this.authservice.getuser().subscribe(res=>{
      this.user=res.user;
    });
  }

}
