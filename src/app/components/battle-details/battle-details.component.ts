import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-battle-details',
  templateUrl: './battle-details.component.html',
  styleUrls: ['./battle-details.component.css']
})
export class BattleDetailsComponent implements OnInit {
  @Input() battleMonsters: any
  @Output() changeHP = new EventEmitter<[string, number]>()

  attacks: [] = []
  initiative: string = ''
  private notInit: string = ''
  private firstAttackBonus: number = 0
  private secondAttackBonus: number = 0
  firstAttackerHP: number = 0
  secondAttackerHP: number = 0
  battleResult: string = ''

  constructor() {}

  ngOnInit(): void {
    this.getInitiative()
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

    document.querySelector('.bottom-button')?.classList.remove('hidden')

    // Handle attacks
    for (let turn = 1; turn <=2; turn++){
      const attacking = turn === 1 ? this.initiative : this.notInit
      const defending = turn === 2 ? this.initiative : this.notInit
      const attackingMonster = this.battleMonsters[attacking]
      const defendingMonster = this.battleMonsters[defending]

      // TODO:  - make this print over the Hit points in the DOM and fix bug
      // this needs to be accessible outside this loop otherwise the defending monst only dies if it gets killed in one attack
      let defMonsterHP = defendingMonster.name === this.battleMonsters[this.initiative] ? this.firstAttackerHP : this.secondAttackerHP

      const ul = document.createElement('ul')
      ul.classList.add('list-group')

      // Handle each specific attack the monster has
      for (let i = 0; i < attackingMonster.actions.length; i++){
        let totalDmg = 0
        let attackName = attackingMonster.actions[i].name
        if (attackName.includes('(')) attackName = attackName.slice(0, attackName.indexOf('(') + 1)

        const atk = attackingMonster.actions[i]
        let dice = Number(atk.damage_dice.slice(0, atk.damage_dice.indexOf('d')))
        const dmgPerDie = atk.damage_dice.includes('+') ?
                        Number(atk.damage_dice.slice(atk.damage_dice.indexOf('d')+1, atk.damage_dice.indexOf('+'))):
                        Number(atk.damage_dice.slice(atk.damage_dice.indexOf('d')+1)) 
        
        while(dice){
          const dmg = Math.floor(Math.random() * dmgPerDie)

          // BUG HERE - attacks are being added onto rather than being separate 
          // (IE - first attack is 10HP, second is 9HP, but it removes 19 the second attack)
          defMonsterHP -= dmg
          defendingMonster.name === this.battleMonsters[this.initiative] ? this.firstAttackerHP = defMonsterHP : this.secondAttackerHP = defMonsterHP
          this.changeHP.emit([defendingMonster.name, defMonsterHP])
          totalDmg += dmg

          if (defMonsterHP <= 0){
            const battleMessage = `${attackingMonster.name} strikes ${defendingMonster.name} with ${attackName} for ${totalDmg}HP!`
            this.printBattleMessage(battleMessage, ul)
            this.battleResult = defendingMonster.name + " has been vanquished!"
            return
          }
          
          dice--
        }
        
        const battleMessage = `${attackingMonster.name} strikes ${defendingMonster.name} with ${attackName} for ${totalDmg}HP!`
        this.printBattleMessage(battleMessage, ul)
      }
    }
  }

  getInitiative(): void {
    const firstInit = this.battleMonsters.first.dexterity + Math.floor(Math.random() * 20)
    const secondInit = this.battleMonsters.second.dexterity + Math.floor(Math.random() * 20)

    this.initiative = firstInit > secondInit ? 'first' : 'second'
    this.notInit = firstInit > secondInit ? 'second' : 'first'

    this.setHP()
  }

  setHP(): void {
    this.firstAttackerHP = this.battleMonsters[this.initiative].hit_points
    this.secondAttackerHP = this.battleMonsters[this.notInit].hit_points
  }

  calculateAttackBonus(): void {
    if (this.battleMonsters.first && this.battleMonsters.second){
      this.firstAttackBonus = Math.floor((this.battleMonsters.first.strength - 10) / 2)
      this.secondAttackBonus = Math.floor((this.battleMonsters.second.strength - 10) / 2)
    }
    else console.log('not enough monsters to battle!')
  }

  printBattleMessage(msg: string, list: Element) {
    const li = document.createElement('li')
    li.classList.add('list-group-item')
    li.textContent = msg

    list.appendChild(li)

    const printTo = document.querySelector('.battle-messages')
    printTo?.appendChild(list)
  }

}
