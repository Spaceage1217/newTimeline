import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import {AddComponent} from './list/add/add.component';

import{TaskService} from './services/task.service';


import { AlertModule } from 'ngx-bootstrap';
import { TimepickerModule } from 'ngx-bootstrap';
import { TooltipModule } from 'ngx-bootstrap/tooltip';




@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    AddComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AlertModule.forRoot(),
    TimepickerModule.forRoot(),
    TooltipModule.forRoot(),

  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
