import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { map } from 'rxjs/operators'; //may need to install this also rxjs-compat
import { tokenNotExpired } from 'angular2-jwt'; //imported to know whether token expiration

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private http:Http, //added http module
  ) { }

  adduser(user:any){
    //console.log(user);
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/register',user,{headers:headers}).pipe(map(res=>res.json()));
  }

  loguser(user:any){
    //console.log(user);
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/login',user,{headers:headers}).pipe(map(res=>res.json()));
  }

  getuser(){
    //console.log(user);
    //console.log(this.fetchuser());
    //const token=localStorage.getItem('Token'); //you can use this directly here without calling function
    let headers=new Headers();
    headers.append('Authorization',this.fetchuser());
    return this.http.get('http://localhost:3000/users/profile',{headers:headers}).pipe(map(res=>res.json()));
  }

  storeuser(token:any){
    localStorage.setItem('Token',token);
    //localStorage.setItem('User',JSON.stringify(user));
  }

  fetchuser():string{
    const token=localStorage.getItem('Token');
    return token;
  }

  logoutuser(){
    localStorage.clear();
  }

  loggedin(){
  return tokenNotExpired('Token'); //ser your token name on Local storage
}

}
