import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  msg:string;
  uname: string;

  constructor(private myhttp:HttpClient) { }

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
      this.msg="Please login to website ";
    }
    else
    {
    var vals={name:this.nm,phone:this.no,email:this.un,message:this.mess};
    this.myhttp.post("http://localhost:3000/api/contactus",vals,{responseType:"text"}).subscribe(
      (response)=>
      {
        this.msg=response;
      },
      (error)=>
      {
        this.msg=error;
      }
    )
    
  }
}

}
