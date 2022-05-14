import { Component, OnInit, Input } from '@angular/core';
import { MonsterService } from 'src/app/monster.service';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {
  @Input() selectedMonsters: any = {
    'first': this.monsterService.selectedMonsters[0] && this.monsterService.selectedMonsters[0],
    'second': this.monsterService.selectedMonsters[1] && this.monsterService.selectedMonsters[1]
  }
  
  constructor(private monsterService: MonsterService) { }
  
  ngOnInit(): void {
    console.log(this.monsterService.selectedMonsters)
  }

}
