import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MonstersListComponent } from './components/monsters-list/monsters-list.component';

const routes: Routes = [
  { path: '/monsters-list', component: MonstersListComponent }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AppRoutingModule { }
