import { FrogFemale, FrogMale } from '../frogs/frogs.model.js';

export default class Validations {
    constructor(lake) {
        this.lake = lake;
    }

    change() {
        const selected = this.lake.services.getCheckedCells();
        if (selected.length > 2) {
            alert('You have selected more than 2 fields!');
            return true;
        }
        return false;
    }

    jump = () => ({
        cell() {
            const selected = this.lake.services.getCheckedCells();
            const frogs = selected.filter((cell) => cell.frog);

            // validate selected cells
            if (selected.length < 2) {
                alert(
                    'You have selected less than 2 fields! You should select the frog, the empty field and click the jump button.'
                );
                return true;
            }

            // validate selected frogs
            if (frogs.length >= 2) {
                alert(
                    'You have selected 2 frogs! You should select the frog, the empty field and click the jump button.'
                );
                return true;
            }
            if (!frogs.length) {
                alert(
                    'You have not selected any frog! You should select the frog, the empty field and click the jump button.'
                );
                return true;
            }

            return false;
        },

        directions({ newPosition, oldPosition }) {
            const frog = this.lake.services
                .getCheckedCells()
                .filter((cell) => cell.frog)[0].frog;

            // horizontal jump
            if (newPosition.row === oldPosition.row) {
                const dif = Math.abs(newPosition.cell - oldPosition.cell);

                if (dif > frog.distance) {
                    alert(`This frog can only jump ${frog.distance} fields`);
                    return true;
                }

                return false;
            }

            // vertical jump
            if (newPosition.cell === oldPosition.cell) {
                const dif = Math.abs(newPosition.row - oldPosition.row);

                if (dif > frog.distance) {
                    alert(`This frog can only jump ${frog.distance} fields`);
                    return true;
                }

                return false;
            }

            // diagonal jump
            // calse 1
            if (
                newPosition.cell - newPosition.row ===
                oldPosition.cell - oldPosition.row
            ) {
                const distance =
                    (Math.abs(oldPosition.cell - newPosition.cell) +
                        Math.abs(oldPosition.row - newPosition.row)) /
                    2;

                if (distance > frog.distance) {
                    alert(`This frog can only jump ${frog.distance} fields`);
                    return true;
                }

                return false;
            }
            // calse 2
            if (
                newPosition.cell + newPosition.row ===
                oldPosition.cell + oldPosition.row
            ) {
                const distance =
                    (Math.abs(oldPosition.cell - newPosition.cell) +
                        Math.abs(oldPosition.row - newPosition.row)) /
                    2;
                if (distance > frog.distance) {
                    alert(`This frog can only jump ${frog.distance} fields`);
                    return true;
                }

                return false;
            }

            alert(
                `This frog can only jump ${frog.distance} fields in vertical, horizontal and diagonal orientations.`
            );
            return true;
        },
    });

    reproduce() {
        const selected = this.lake.services.getCheckedCells();
        const frogs = selected.filter((cell) => cell.frog);

        // validate selected cells
        if (frogs.length < 2) {
            alert(
                'Select one frog a male, one female and click the reproduce button.'
            );
            return true;
        }

        // validate gender
        const male = frogs.find((cell) => cell.frog instanceof FrogMale);
        const female = frogs.find((cell) => cell.frog instanceof FrogFemale);
        if (!male || !female) {
            alert('Select frogs with different genders.');
            return true;
        }

        // validate position
        if (
            Math.abs(male.row - female.row) > 1 ||
            Math.abs(male.cell - female.cell) > 1
        ) {
            alert('Select adjacent frogs!');
            return true;
        }

        return false;
    }
}
