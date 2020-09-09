import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {HomeFacade} from "./home.facade";



@NgModule({
  declarations: [
    HomeComponent,
    HomeFacade
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HomeFacade
  ]
})
export class HomeModule { }
