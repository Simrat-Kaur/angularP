import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-himachalpdetails',
  templateUrl: './himachalpdetails.component.html',
  styleUrls: ['./himachalpdetails.component.css']
})
export class HimachalpdetailsComponent implements OnInit {
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
