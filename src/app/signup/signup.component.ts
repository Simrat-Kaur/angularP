import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  name:string;
  phone:string;
  gender:string;
  un:string;
  pass:string;
  cpass:string;
  msg:string;

  constructor(private myhttp:HttpClient,private myrouter:Router) { }

  ngOnInit() {
    $(document).ready(function(){
      $(".btn").mouseover(function(){
        $(".btn").css("background-color", "yellow");
      });
      $(".btn").mouseout(function(){
        $(".btn").css("background-color", "gray");
      });
    });
  
  }
  ons1click()
  {
    if(this.name==null || this.phone==null || this.gender==null || this.un==null || this.pass==null || this.cpass==null)
    {
      alert("Please Fill all the required Fields");
    }
    else
    {
    if(this.pass==this.cpass)
    {
    var vals={nm:this.name,ph:this.phone,gen:this.gender,uname:this.un,pass:this.pass,utype:'admin'};
    this.myhttp.post("http://localhost:3000/api/signup",vals,{responseType:"text"}).subscribe(
      (response)=>
      {
        alert("Signup Successfull")
        window.location.reload();
      },
      (error)=>
      {
        alert(error);
      }
    )
    }
    else
    {
      this.msg="Passwords Do not match";
    }
  }
    
  }


}


