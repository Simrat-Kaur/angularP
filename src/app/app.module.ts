import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{FormsModule} from '@angular/forms';
import{HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ContactusComponent } from './contactus/contactus.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';
import { AdminheaderComponent } from './adminheader/adminheader.component';
import { MemberlistComponent } from './memberlist/memberlist.component';
import { ViewmessageComponent } from './viewmessage/viewmessage.component';
import { BookingComponent } from './booking/booking.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { GoadestdetailsComponent } from './goadestdetails/goadestdetails.component';
import { DestinationsComponent } from './destinations/destinations.component';
import { HimachaldestdetailsComponent } from './himachaldestdetails/himachaldestdetails.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ChangepasswordComponent,
    ContactusComponent,
    HomeComponent,
    LogoutComponent,
    AdminheaderComponent,
    MemberlistComponent,
    ViewmessageComponent,
    BookingComponent,
    AboutusComponent,
    AdminhomeComponent,
    GoadestdetailsComponent,
    DestinationsComponent,
    HimachaldestdetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
