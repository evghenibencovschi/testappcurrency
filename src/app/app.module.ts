import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {DataService} from './services/data.service';
import {HomeModule} from './components/home/home.module';
import {HttpClientModule} from '@angular/common/http';
import {ParseService} from './services/parse.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HomeModule,
    HttpClientModule
  ],
  providers: [
    DataService,
    ParseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
