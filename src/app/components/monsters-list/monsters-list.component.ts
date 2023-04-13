import { Component, OnInit, Output, Renderer2 } from '@angular/core';
import { MonsterService } from 'src/app/monster.service';
import { firstValueFrom } from 'rxjs';

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

    // TEST RECURSIVE FETCH
    this.getAllMonsters();
  }

  // TEST RECURSIVE FETCH
  async getAllMonsters() {
    // const test = this.monsterService.getAllMonsters(1).subscribe(x => console.log('xxx', x));
    const t = firstValueFrom(this.monsterService.getAllMonsters(1));
    const [testData] = await Promise.all([t]);
    console.log('testData', testData);
  }

  getMonsters(): void {
    this.monsterService.getMonsters()
        .subscribe(monsters => {
          // console.log(monsters)
          this.monsters = monsters
        })
  }

  // Same as below, but I was calling this by importing this Component into page-nav
  // changePage(direction: string): void {
  //   this.monsterService.changePage(direction)
  //   this.getMonsters()
  // }

  handlePageEvent(direction: string): void {
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

