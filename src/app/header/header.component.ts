import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
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
  onlogout1()
  {
    sessionStorage.clear();
    this.myrouter.navigateByUrl('/sitehome');
    this.ngOnInit();
  }

}
