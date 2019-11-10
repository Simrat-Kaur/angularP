import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  currp:string;
  newp:string;
  cnewp:string;
  msg:string;

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
  onchangepass()
  {
    if(this.currp==null ||this.newp==null||this.cnewp==null)
    {
      alert("Please Fill the Required Fields");
    }
    else
    {
    if(this.newp==this.cnewp)
    {
    var params={un:sessionStorage.getItem("uname"),cpass:this.currp,newp:this.newp};
    this.myhttp.put("http://localhost:3000/api/changepass",params,{responseType:"json"}).subscribe(
      (response)=>
      {
        if(response["nModified"]==0)
        {
          this.msg="Current Password Incorrect";
        }
        else if(response["nModified"]==1)
        {
          this.msg="Password Changed Successfully";
        }
      },
      
      (error)=>
      {
        this.msg=error;
      }
      
    )
  }
  
  else
  {
    this.msg="New Passwords does not match";

  }
}
  }

}
