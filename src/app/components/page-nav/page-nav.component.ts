import { Component, OnInit } from '@angular/core';
import { MonsterService } from 'src/app/monster.service';
import { MonstersListComponent } from '../monsters-list/monsters-list.component';

@Component({
  selector: 'app-page-nav',
  templateUrl: './page-nav.component.html',
  styleUrls: ['./page-nav.component.css']
})
export class PageNavComponent implements OnInit {

  constructor(
    private monsterService: MonsterService,
    private monstersList: MonstersListComponent
    ) { }

  ngOnInit(): void {
  }

  changePage(direction: string): void {
    this.monsterService.changePage(direction)
    this.monstersList.getMonsters()
  }

}
