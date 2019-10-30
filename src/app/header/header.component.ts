import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  visibility:boolean;
  name:string;

  constructor(private myrouter:Router) { }

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
   // this.fetchcat();
  }
  onlogout()
  {
    sessionStorage.clear();
    this.myrouter.navigateByUrl('login.html');
  }

}
