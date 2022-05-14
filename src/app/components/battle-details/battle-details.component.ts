import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-battle-details',
  templateUrl: './battle-details.component.html',
  styleUrls: ['./battle-details.component.css']
})
export class BattleDetailsComponent implements OnInit {
  @Input() battleMonsters: any

  attacks: [] = []
  initiative: string = ''
  private notInit: string = ''
  private firstAttackBonus: number = 0
  private secondAttackBonus: number = 0
  battleResult: string = ''

  constructor() {}

  ngOnInit(): void {
    this.calculateAttackBonus()
  }

  makeAttack(): void {
    if (!this.initiative) this.getInitiative()

    for (let turn = 1; turn <=2; turn++){
      console.log('attacking')
      const attackingMonster = turn === 1 ? this.initiative : this.notInit
      const defendingMonster = turn === 2 ? this.notInit : this.initiative

      for (let i = 0; i < this.battleMonsters[attackingMonster].actions.length; i++){
        console.log('this runs')
        const atk = this.battleMonsters[attackingMonster].actions[i]
        let dice = atk.damage_dice.slice(0, atk.damage_dice.indexOf('d'))
        const dmgPerDie = atk.damage_dice.slice(atk.damage_dice.indexOf('d')+1)
        
        while(dice){
          console.log('while dice loop')
          const dmg = Math.floor(Math.random() * dmgPerDie)
          this.battleMonsters[defendingMonster].hit_points -= dmg

          if (this.battleMonsters[defendingMonster].hit_points <= 0){
            this.battleResult = this.battleMonsters[defendingMonster].name + " has been vanquished!"
            console.log(this.battleResult)

            
            return
          }
          dice--
        }
    }
    }
    

  }

  getInitiative(): void {
    const firstInit = this.battleMonsters.first.dexterity + Math.floor(Math.random() * 20)
    const secondInit = this.battleMonsters.second.dexterity + Math.floor(Math.random() * 20)

    this.initiative = firstInit > secondInit ? 'first' : 'second'
    this.notInit = firstInit > secondInit ? 'second' : 'first'
  }

  calculateAttackBonus(): void {
    if (this.battleMonsters.first && this.battleMonsters.second){
      this.firstAttackBonus = Math.floor((this.battleMonsters.first.strength - 10) / 2)
      this.secondAttackBonus = Math.floor((this.battleMonsters.second.strength - 10) / 2)
  
      console.log('attckbon', this.firstAttackBonus, this.secondAttackBonus)
    }
    else console.log('not enough monsters to battle!')
  }

}
