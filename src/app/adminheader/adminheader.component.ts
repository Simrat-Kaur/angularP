import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.css']
})
export class AdminheaderComponent implements OnInit {
  name:string;
  visibility:boolean;

  constructor(private myrouter:Router) {
    myrouter.events.subscribe(event=>
      {
        if(event instanceof NavigationEnd)
        {
          this.ngOnInit();
        }
      })
   }

  ngOnInit() {
    console.log("ngOninit running of header");
    if(sessionStorage.getItem("nm")!=null)
        {
      this.name=sessionStorage.getItem("nm");
      this.visibility=false;
    }
    else
    {
       this.name="Guest";
       this.visibility=true;
    }
  }
  onlogout()
  {
    sessionStorage.clear();
    this.myrouter.navigateByUrl('login.html');
  }

}
