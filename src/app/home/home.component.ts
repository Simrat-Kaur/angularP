import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  uname:String;

  constructor(private myrouter:Router) { }

  ngOnInit() {
    $("#slideshow > div:gt(0)").hide();

setInterval(function() {
  $('#slideshow > div:first')
    .fadeOut(1000)
    .next()
    .fadeIn(1000)
    .end()
    .appendTo('#slideshow');
}, 2000);
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
