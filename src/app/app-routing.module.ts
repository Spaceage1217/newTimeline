import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddComponent} from './list/add/add.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '', component:ListComponent,
    children: []
},
 {
    path: 'add', component:AddComponent,
    children: []
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
