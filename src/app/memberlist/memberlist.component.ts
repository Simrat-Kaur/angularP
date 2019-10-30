import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-memberlist',
  templateUrl: './memberlist.component.html',
  styleUrls: ['./memberlist.component.css']
})
export class MemberlistComponent implements OnInit {
  msg:string;
  userlist:any[];

  constructor(private myhttp:HttpClient,private myrouter:Router) { }

  ngOnInit() {
    this.fetchmembers();
  }
  fetchmembers()
  {
    this.myhttp.get("http://localhost:3000/api/memlist",{responseType:"json"}).subscribe(
      (response:any[])=>
      {
        if(response.length>0)
        {
          this.userlist=response;
        }
        else
        {
          this.msg="No Records Found";
        }
      },
      (error)=>
      {
        this.msg=error;
      }
    )
  }
  onuserdelete(id)
  {
     if(confirm("Are you sure you want to Delete"))
    {
    this.myhttp.delete("http://localhost:3000/api/delmemb?id=" +id,{responseType:"text"}).subscribe(
      (response)=>
      {
        alert(response);
        this.fetchmembers();
      },
      (error)=>
      {
        this.msg=error;
      }
    )
  }
}

}
