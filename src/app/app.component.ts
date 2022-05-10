import { Component } from '@angular/core';
import { MonstersListComponent } from './components/monsters-list/monsters-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Monsters being Monsters';
}
