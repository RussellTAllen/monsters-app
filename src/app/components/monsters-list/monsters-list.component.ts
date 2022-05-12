import { Component, OnInit, Renderer2 } from '@angular/core';
import { MonsterService } from 'src/app/monster.service';

@Component({
  selector: 'app-monsters-list',
  templateUrl: './monsters-list.component.html',
  styleUrls: ['./monsters-list.component.css']
})
export class MonstersListComponent implements OnInit {
  monsters: Array<any> = []
  selectedMonsters: Array<string> = []

  constructor(
    private monsterService: MonsterService,
    private renderer: Renderer2
    ) { }

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
    this.getMonsters()
  }

  selectMonster(monster: string): void {
    this.selectedMonsters.unshift(monster)

    if (this.selectedMonsters.length > 2){
      this.selectedMonsters.pop()
    }
  }

  showImage(imageSrc: string): void {
    const imageEl = this.renderer.selectRootElement('.image-popup')
    const image = document.createElement('img')
    image.src = imageSrc
    imageEl.classList.remove('hidden')
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

