import Printer from '../assets/printer.js';
import refs from '../assets/references.js';
import { FrogFemale, FrogMale } from '../frogs/frogs.model.js';

export default class LakeServices {
    constructor(matrix) {
        this.matrix = matrix;
        // injection
        this.printer = new Printer(this);
    }

    reset() {
        refs.inputs.forEach((input) => (input.checked = false));
    }

    getCellByPosition({ row, cell }) {
        return this.matrix[row][cell];
    }

    getCheckedCells() {
        const result = [];
        this.matrix.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                if (cell.input.checked)
                    result.push({
                        input: cell.input,
                        frog: cell.frog,
                        row: rowIndex,
                        cell: cellIndex,
                    });
            });
        });
        return result;
    }

    findFreeCell(place) {
        const height = this.matrix.length;
        const width = this.matrix[0].length;

        // iterate from start to end
        for (let row = place.row; row < height; row++) {
            for (let cell = place.cell; cell < width; cell++) {
                const newPlace = this.getCellByPosition({ row, cell });
                if (!newPlace.frog) return { row, cell }; // brake the loop
            }

            for (let cell = place.cell; cell >= 0; cell--) {
                const newPlace = this.getCellByPosition({ row, cell });
                if (!newPlace.frog) return { row, cell }; // brake the loop
            }
        }

        // iterate from end to start
        for (let row = place.row; row >= 0; row--) {
            for (let cell = place.cell; cell < width; cell++) {
                const newPlace = this.getCellByPosition({ row, cell });
                if (!newPlace.frog) return { row, cell }; // brake the loop
            }

            for (let cell = place.cell; cell >= 0; cell--) {
                const newPlace = this.getCellByPosition({ row, cell });
                if (!newPlace.frog) return { row, cell }; // brake the loop
            }
        }

        // the end
        alert('You dont have free space for your frogs');
        return null;
    }

    putFrog({ newPosition, frog }) {
        // put frog into new position
        this.getCellByPosition(newPosition).frog = frog;
        // render new frog
        this.printer.init({ newPosition });
    }

    replaceFrog({ newPosition, oldPosition, frog }) {
        // render new frog
        this.printer.rerender({ newPosition, oldPosition });

        // update matrix
        this.getCellByPosition(oldPosition).frog = null;
        this.getCellByPosition(newPosition).frog = frog;
    }
}
