import { Celda } from './celda';

const ADYACENTES = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

export class Tabla {
  celdas: Celda[][] = [];

  private celdasRestantes = 0;
  private mineCount = 0;

  constructor(size: number, mines: number) {
    for (let y = 0; y < size; y++) {
      this.celdas[y] = [];
      for (let x = 0; x < size; x++) {
        this.celdas[y][x] = new Celda(y, x);
      }
    }

    // Assign mines
    for (let i = 0; i < mines; i++) {
      this.randomCelda().mine = true;
    }

    // Count mines

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        let adjacentMines = 0;
        for (const peer of ADYACENTES) {
          if (
            this.celdas[y + peer[0]] &&
            this.celdas[y + peer[0]][x + peer[1]] &&
            this.celdas[y + peer[0]][x + peer[1]].mine
          ) {
            adjacentMines++;
          }
        }
        this.celdas[y][x].proximityMines = adjacentMines;

        if (this.celdas[y][x].mine) {
          this.mineCount++;
        }
      }
    }
    this.celdasRestantes = size * size - this.mineCount;
  }

  randomCelda(): Celda {
    const y = Math.floor(Math.random() * this.celdas.length);
    const x = Math.floor(Math.random() * this.celdas[y].length);
    return this.celdas[y][x];
  }

  checkCelda(celda: Celda): 'gameover' | 'win' | null {
    if (celda.status !== 'open') {
      return;
    } else if (celda.mine) {
      this.revealAll();
      return 'gameover';
    } else {
      celda.status = 'clear';

      // Empty celda, let's clear the whole block.
      if(celda.proximityMines === 0) {
        for(const peer of ADYACENTES) {
          if (
            this.celdas[celda.row + peer[0]] &&
            this.celdas[celda.row + peer[0]][celda.column + peer[1]]
          ) {
            this.checkCelda(this.celdas[celda.row + peer[0]][celda.column + peer[1]]);
          }
        }
      }

      if (this.celdasRestantes-- <= 1) {
        return 'win';
      }
      return;
    }
  }
  revealAll() {
    for (const row of this.celdas) {
      for (const celda of row) {
        if (celda.status === 'open') {
          celda.status = 'clear';
        }
      }
    }
  }
}
