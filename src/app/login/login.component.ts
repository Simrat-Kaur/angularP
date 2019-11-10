import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  un:string;
  pass:string;
  msg:string;
  userinfo:any[];

  constructor(private myhttp:HttpClient,private myrouter:Router) { }

  ngOnInit() {
    $(document).ready(function(){
      $(".btn").mouseover(function(){
        $(".btn").css("background-color", "yellow");
        $(".btn").css("color", "gray");
      });
      $(".btn").mouseout(function(){
        $(".btn").css("background-color", "gray");
        $(".btn").css("color", "white");
      });
    });
  }

  onlogin()
  {
    if(this.un==null || this.pass==null)
    {
      alert("Please Fill the Required Fields");
    }
    else{
    var params={un:this.un,pass:this.pass};
    this.myhttp.post("http://localhost:3000/api/login",params,{responseType:"json"}).subscribe(
      (response:any[])=>
      {
        if(response.length>0)
        {
          this.userinfo=response;
          sessionStorage.setItem("nm",this.userinfo[0]['name']);
          sessionStorage.setItem("uname",this.userinfo[0]['username']);
          if(this.userinfo[0]['usertype']=="admin")
          {
            sessionStorage.setItem("utype","admin");
            this.myrouter.navigateByUrl('adminpanel');
          }
          else
          {
            sessionStorage.setItem("utype","normal");
            this.myrouter.navigateByUrl('sitehome');
          }
        }
        else
        {
          alert("Incorrect Username/Password");
        }
      
      },
      (error)=>
      {
        alert(error);
      }
      
    )
  }
}

}
