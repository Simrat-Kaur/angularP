import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { AdminheaderComponent } from './adminheader/adminheader.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';
import { MemberlistComponent } from './memberlist/memberlist.component';
import { ViewmessageComponent } from './viewmessage/viewmessage.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { BookingComponent } from './booking/booking.component';
import { DestinationsComponent } from './destinations/destinations.component';
import { GoadestdetailsComponent } from './goadestdetails/goadestdetails.component';
import { componentFactoryName } from '@angular/compiler';
import { HimachaldestdetailsComponent } from './himachaldestdetails/himachaldestdetails.component';
import { RajasthandestdetailsComponent } from './rajasthandestdetails/rajasthandestdetails.component';
import { RajasthanpdetailsComponent } from './rajasthanpdetails/rajasthanpdetails.component';
import { GoapdetailsComponent } from './goapdetails/goapdetails.component';
import { HimachalpdetailsComponent } from './himachalpdetails/himachalpdetails.component';



const routes: Routes = [
  {
    path:"",
    redirectTo:"sitehome",
    pathMatch:"full"
  },
  {
    path:"signup.html",
    component: SignupComponent
  },
  {
    path:"login.html",
    component: LoginComponent
  },
  {
    path:"contactus",
    component: ContactusComponent
  },
  {
    path:"changepassword",
    component: ChangepasswordComponent
  },
  {
    path:"adminpanel",
    component: AdminhomeComponent
  },
  {
    path:"sitehome",
    component:HomeComponent
  },
  {
    path:"logout.html",
    component: LogoutComponent
  },
  {
    path:"memberlist",
    component:MemberlistComponent
  },
  {
    path:"viewmessage",
    component:ViewmessageComponent
  },
  {
    path:"aboutus",
    component:AboutusComponent
  },
  {
    path:"booking",
    component:BookingComponent
  },
  {
    path:"destinations",
    component:DestinationsComponent
  },
  {
    path:"goadestdetails",
    component:GoadestdetailsComponent
  },
  {
    path:"himachaldestdetails",
    component:HimachaldestdetailsComponent
  },
  {
    path:"rajasthandestdetails",
    component:RajasthandestdetailsComponent
  },
  {
    path:"rajasthanpdetails",
    component:RajasthanpdetailsComponent
  },
  {
    path:"goapdetails",
    component:GoapdetailsComponent
  },
  {
    path:"himachalpdetails",
    component:HimachalpdetailsComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
