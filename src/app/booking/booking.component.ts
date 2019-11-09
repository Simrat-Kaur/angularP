import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  name:string;
  phone:string;
  un:string;
  pno:string;
  from:string;
  to:string;
  
  

  constructor(private myrouter:Router) { }

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
    if(this.name==null || this.phone==null || this.un==null || this.pno==null || this.from==null || this.to==null)
    {
      alert("Please Fill all the required Fields");
    }
    else
    {
      alert("Thanks For Booking");
      this.myrouter.navigateByUrl('sitehome');
    }
  }
}
