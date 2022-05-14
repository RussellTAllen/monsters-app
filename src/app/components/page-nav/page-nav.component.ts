import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MonsterService } from 'src/app/monster.service';
// import { MonstersListComponent } from '../monsters-list/monsters-list.component';

@Component({
  selector: 'app-page-nav',
  templateUrl: './page-nav.component.html',
  styleUrls: ['./page-nav.component.css']
})
export class PageNavComponent implements OnInit {
  @Output() pageEvent = new EventEmitter<string>()

  constructor(
    private monsterService: MonsterService,
    // private monstersList: MonstersListComponent
    ) { }

  ngOnInit(): void {
  }

  changePage(direction: string): void {
    // ONE METHOD - imports the component and fires the function from here...
    // this.monsterService.changePage(direction)
    // this.monstersList.getMonsters()

    // Refactored to use EventEmitter - not sure which is "best practice"
    this.pageEvent.emit(direction)
  }

}
