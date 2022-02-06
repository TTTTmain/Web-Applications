import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListactorComponent } from './listactor/listactor.component';
import { AddactorComponent } from './addactor/addactor.component';
import { UpdateactorComponent } from './updateactor/updateactor.component';
import { AddmovieComponent } from './addmovie/addmovie.component';
import { ListmovieComponent } from './listmovie/listmovie.component';
import { ManagemovieactorComponent } from './managemovieactor/managemovieactor.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UpdatemovieComponent } from './updatemovie/updatemovie.component';
import { PathNotfoundComponent } from './path-notfound/path-notfound.component';
import { DbServiceService } from './db-service.service';
@NgModule({
  declarations: [
    AppComponent,
    ListactorComponent,
    AddactorComponent,
    UpdateactorComponent,
    AddmovieComponent,
    ListmovieComponent,
    ManagemovieactorComponent,
    UpdatemovieComponent,
    PathNotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [DbServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
