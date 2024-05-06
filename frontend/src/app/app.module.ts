import { ApplicationRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxViacepModule } from "@brunoc/ngx-viacep";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CreateAddressModalComponent } from './create-address-modal/create-address-modal.component';
import { EditAddressModalComponent } from './edit-address-modal/edit-address-modal.component';
import { DeleteAddressModalComponent } from './delete-address-modal/delete-address-modal.component';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    // AppComponent,
    HomeComponent,
    CreateAddressModalComponent,
    EditAddressModalComponent,
    DeleteAddressModalComponent,
    // LoginComponent,
    // RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MdbModalModule,
    HttpClientModule,
    FormsModule,
    NgxViacepModule
  ],
  providers: [],
  // bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private appRef: ApplicationRef) {}

  ngDoBootstrap() {
    this.appRef.bootstrap(AppComponent);
  }
}
