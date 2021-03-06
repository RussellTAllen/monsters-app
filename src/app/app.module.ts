import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MonsterSearchComponent } from './components/monster-search/monster-search.component';
import { MonstersListComponent } from './components/monsters-list/monsters-list.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageNavComponent } from './components/page-nav/page-nav.component';
import { BattleComponent } from './components/battle/battle.component';
import { BattleDetailsComponent } from './components/battle-details/battle-details.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    MonsterSearchComponent,
    MonstersListComponent,
    NavbarComponent,
    PageNavComponent,
    BattleComponent,
    BattleDetailsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
