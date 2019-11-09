import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rajasthanpdetails',
  templateUrl: './rajasthanpdetails.component.html',
  styleUrls: ['./rajasthanpdetails.component.css']
})
export class RajasthanpdetailsComponent implements OnInit {
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
