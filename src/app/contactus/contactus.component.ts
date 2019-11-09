import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  nm:string;
  un:string;
  no:string;
  mess:string;
  uname: string;

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
  onsubmit()
  {
    this.uname=sessionStorage.getItem("uname");
    if(this.uname==null)
    {
      alert("Please login to website");
    }
    else
    {
      if(this.nm==null || this.un==null ||this.no==null ||this.mess==null)
      {
        alert("Please Fill all the required Fields");
      }
      else{
    var vals={name:this.nm,phone:this.no,email:this.un,message:this.mess};
    this.myhttp.post("http://localhost:3000/api/contactus",vals,{responseType:"text"}).subscribe(
      (response)=>
      {
        alert(response);
        window.location.reload();
        
      },
      (error)=>
      {
        alert(error);
      }
    )
    
  }
}
}
clearfields()
{
  this.nm=null;
}

}
