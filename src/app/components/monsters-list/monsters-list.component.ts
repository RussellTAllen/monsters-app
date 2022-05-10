import { Component, OnInit } from '@angular/core';
import { MonsterService } from 'src/app/monster.service';

@Component({
  selector: 'app-monsters-list',
  templateUrl: './monsters-list.component.html',
  styleUrls: ['./monsters-list.component.css']
})
export class MonstersListComponent implements OnInit {
  monsters: any = []

  constructor(private monsterService: MonsterService) { }

  ngOnInit(): void {
    this.getMonsters()
  }

  getMonsters(): void {
    this.monsterService.getMonsters()
        .subscribe(monsters => {
          console.log(monsters)
          this.monsters = monsters
        })
  }

  changePage(direction: string): void {
    this.monsterService.changePage(direction)
    this.monsterService.getMonsters()
        .subscribe(monsters => {
          console.log(monsters)
          this.monsters = monsters
        })
  }
}


