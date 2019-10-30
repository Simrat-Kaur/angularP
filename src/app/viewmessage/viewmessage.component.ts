import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewmessage',
  templateUrl: './viewmessage.component.html',
  styleUrls: ['./viewmessage.component.css']
})
export class ViewmessageComponent implements OnInit {
  messages:any[];
  msg:string;

  constructor(private myhttp:HttpClient,private myrouter:Router) { }

  ngOnInit() {
    this.fetchmessages();
  }
  fetchmessages()
  {
    console.log("requests messages");
    this.myhttp.get("http://localhost:3000/api/getmessages",{responseType:"json"}).subscribe(
      (response:any[])=>
      {
        if(response.length>0)
        {
          this.messages=response;
          // for(let i =0; i != this.orders.length; i++) {
          //   this.status.push(this.orders[i].status);
          // }
          
        }
        else
        {
          this.msg="No details found";
        }

      },
      (error)=>
      {
        this.msg=error;
      }
    )
  }

}
