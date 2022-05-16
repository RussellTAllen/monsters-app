import { Component, OnInit, Input } from '@angular/core';
import { MonsterService } from 'src/app/monster.service';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {
  // goesFirst: string = ''
  // goesSecond: string = ''
  selectedMonsters: any = {
    'first': this.monsterService.selectedMonsters[0] && this.monsterService.selectedMonsters[0],
    'second': this.monsterService.selectedMonsters[1] && this.monsterService.selectedMonsters[1]
  }
  firstHP: number = 0
  secondHP: number = 0
  
  
  constructor(private monsterService: MonsterService) { 

  }
  
  ngOnInit(): void {
    this.firstHP = this.selectedMonsters.first.hit_points
    this.secondHP = this.selectedMonsters.second.hit_points
  }

  changeHP(monsterAndHP: [string, number]): void {
    monsterAndHP[0] === this.selectedMonsters.first.name ? this.firstHP = monsterAndHP[1] : this.secondHP = monsterAndHP[1]
  }

  // getInitiative(): void {
  //   const firstInit = this.selectedMonsters.first.dexterity + Math.floor(Math.random() * 20)
  //   const secondInit = this.selectedMonsters.second.dexterity + Math.floor(Math.random() * 20)

  //   this.goesFirst = firstInit > secondInit ? 'first' : 'second'
  //   this.goesSecond = firstInit > secondInit ? 'second' : 'first'


  // }

  // setHP(): void {
  //   this.selectedMonsters[this.initiative]
  // }

}
