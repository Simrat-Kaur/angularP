import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-himachalpdetails',
  templateUrl: './himachalpdetails.component.html',
  styleUrls: ['./himachalpdetails.component.css']
})
export class HimachalpdetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function(){
      $("#p1").mouseover(function(){
        $("#p1").fadeTo("fast",0.7);
      });
      $("#p1").mouseout(function(){
        $("#p1").fadeTo("fast",1);
      });
      $("#p2").mouseover(function(){
        $("#p2").fadeTo("fast",0.7);
      });
      $("#p2").mouseout(function(){
        $("#p2").fadeTo("fast",1);
      });
      $("#p3").mouseover(function(){
        $("#p3").fadeTo("fast",0.7);
      });
      $("#p3").mouseout(function(){
        $("#p3").fadeTo("fast",1);
      });
      $("#p4").mouseover(function(){
        $("#p4").fadeTo("fast",0.7);
      });
      $("#p4").mouseout(function(){
        $("#p4").fadeTo("fast",1);
      });
    });
  }

}
