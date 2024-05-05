import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CreateAddressModalComponent } from './create-address-modal/create-address-modal.component';
import { EditAddressModalComponent } from './edit-address-modal/edit-address-modal.component';
import { DeleteAddressModalComponent } from './delete-address-modal/delete-address-modal.component';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateAddressModalComponent,
    EditAddressModalComponent,
    DeleteAddressModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MdbModalModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
