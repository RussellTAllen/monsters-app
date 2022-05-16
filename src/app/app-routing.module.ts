import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BattleComponent } from './components/battle/battle.component';
import { HomeComponent } from './components/home/home.component';
import { MonstersListComponent } from './components/monsters-list/monsters-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent},
  { path: 'monsters-list', component: MonstersListComponent },
  { path: 'battle', component: BattleComponent }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
