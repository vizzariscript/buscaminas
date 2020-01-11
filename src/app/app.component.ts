import { Component } from '@angular/core';
import { Tabla } from './components/tabla';
import { Celda } from './components/celda';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'minesweeper';
  board: Tabla;
  constructor() {
    this.reset();
  }

  checkCell(cell: Celda) {
    const result = this.board.checkCelda(cell);
    if (result === 'gameover') {
      alert('You lose');
    } else if (result === 'win') {
      alert('you win');
    }
  }
  flag(cell: Celda) {
    if (cell.status === 'flag') {
      cell.status = 'open';
    } else {
      cell.status = 'flag';
    }
  }

  reset() {
    this.board = new Tabla(15, 50);
  }
}
