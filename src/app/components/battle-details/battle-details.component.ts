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
    if (!this.battleMonsters.first.actions){
      this.battleResult = this.battleMonsters.first.name + " is terrified and flees the battle!"
      return
    }
    if (!this.battleMonsters.second.actions){
      this.battleResult = this.battleMonsters.second.name + " is terrified and flees the battle!"
      return
    }

    if (!this.initiative) this.getInitiative()

    // Handle attacks
    for (let turn = 1; turn <=2; turn++){
      const attacking = turn === 1 ? this.initiative : this.notInit
      const defending = turn === 2 ? this.initiative : this.notInit
      const attackingMonster = this.battleMonsters[attacking]
      const defendingMonster = this.battleMonsters[defending]

      console.log('attack', attacking)
      console.log('def', defending)
      console.log('atking', attackingMonster)
      console.log('defing', defendingMonster)


      // Handle each specific attack the monster has
      for (let i = 0; i < attackingMonster.actions.length; i++){
        let totalDmg = 0
        let attackName = ''

        const atk = attackingMonster.actions[i]
        let dice = Number(atk.damage_dice.slice(0, atk.damage_dice.indexOf('d')))
        let dmgPerDie = atk.damage_dice.includes('+') ?
                        Number(atk.damage_dice.slice(atk.damage_dice.indexOf('d')+1, atk.damage_dice.indexOf('+'))):
                        Number(atk.damage_dice.slice(atk.damage_dice.indexOf('d')+1)) 
        
        while(dice){
          const dmg = Math.floor(Math.random() * dmgPerDie)

          // console.log('dmg', dmg)
          // console.log('HP', defendingMonster.hit_points)
          defendingMonster.hit_points -= dmg
          totalDmg += dmg

          if (defendingMonster.hit_points <= 0){
            const battleMessage = attackingMonster.name + " hit " + defendingMonster.name + " for " + totalDmg + "HP."
            this.printBattleMessage(battleMessage)
            this.battleResult = defendingMonster.name + " has been vanquished!"
            return
          }

          dice--
        }

        const battleMessage = attackingMonster.name + " hit " + defendingMonster.name + " for " + totalDmg + "HP."
        this.printBattleMessage(battleMessage)
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
    }
    else console.log('not enough monsters to battle!')
  }

  printBattleMessage(msg: string) {
    const li = document.createElement('li')
    li.textContent = msg
    const ul = document.querySelector('.battle-messages')
    ul?.appendChild(li)
  }

}
