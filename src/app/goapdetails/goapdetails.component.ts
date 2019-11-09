import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-goapdetails',
  templateUrl: './goapdetails.component.html',
  styleUrls: ['./goapdetails.component.css']
})
export class GoapdetailsComponent implements OnInit {
  uname:String;


  constructor(private myrouter:Router) { }

  ngOnInit() {
    
      
  }

  ons1click()
  {
    this.uname=sessionStorage.getItem("uname");
    if(this.uname==null)
    {
      alert("Please login to website");
    }
    else
    {
      this.myrouter.navigateByUrl('/booking');
    }
  
  }

}
