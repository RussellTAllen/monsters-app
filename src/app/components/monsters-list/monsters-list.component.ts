import { Component, OnInit, Output, Renderer2 } from '@angular/core';
import { MonsterService } from 'src/app/monster.service';

@Component({
  selector: 'app-monsters-list',
  templateUrl: './monsters-list.component.html',
  styleUrls: ['./monsters-list.component.css']
})
export class MonstersListComponent implements OnInit {
  monsters: Array<any> = []
  selectedMonsters: Array<any> = this.monsterService.selectedMonsters
  

  constructor(
    private monsterService: MonsterService,
    private renderer: Renderer2
    ) { }

  ngOnInit(): void {
    this.getMonsters()
    console.log(this.selectedMonsters)
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
    this.getMonsters()
  }

  selectMonster(monster: object): void {
    this.selectedMonsters.unshift(monster)

    if (this.selectedMonsters.length > 2){
      this.selectedMonsters.pop()
    }

    this.monsterService.selectedMonsters = this.selectedMonsters
  }

  showImage(name: string, imageSrc: string): void {
    const imageEl = this.renderer.selectRootElement('.image-popup')
    const nameTag = document.createElement('h1')
    const image = document.createElement('img')
    nameTag.textContent = name
    nameTag.classList.add('monster-name')
    image.src = imageSrc
    imageEl.classList.remove('hidden')
    imageEl.appendChild(nameTag)
    imageEl.appendChild(image)

    setTimeout(() => {
      imageEl.addEventListener('click', removeImage)
    }, 100)

    const removeImage = (): void => {
      imageEl.classList.add('hidden')
      imageEl.removeEventListener('click', removeImage)
    }
  }

}

