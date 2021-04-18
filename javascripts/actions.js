import Characteristics from './assets/characteristics.js';
import refs from './assets/references.js';
import Validations from './assets/validations.js';
import { FrogFemale, FrogMale } from './frogs/frogs.model.js';

export default class Actions {
    constructor(lake) {
        this.lake = lake;
        // injection
        this.validation = new Validations(lake);
    }

    change() {
        document.addEventListener('change', () => {
            if (this.validation.change()) this.lake.services.reset();
        });
    }

    jump() {
        refs.jumpBtn.addEventListener('click', () => {
            // validate selected cell
            if (this.validation.jumpCell()) return;

            // get position
            const cells = this.lake.services.getCheckedCells();
            const newPosition = cells.find((cell) => !cell.frog);
            const oldPosition = cells.find((cell) => cell.frog);

            // validate jump directions
            if (this.validation.jumpDirections({ newPosition, oldPosition }))
                return;

            // do jump
            this.lake.services.replaceFrog({
                newPosition,
                oldPosition,
                frog: oldPosition.frog,
            });
            this.lake.services.reset();
        });
    }

    reproduce(factory) {
        refs.reproduceBtn.addEventListener('click', () => {
            // validate selected cell
            if (this.validation.reproduce()) return;

            const frogs = this.lake.services.getCheckedCells();
            const male = frogs.find((cell) => cell.frog instanceof FrogMale);
            const female = frogs.find(
                (cell) => cell.frog instanceof FrogFemale
            );

            const position = this.lake.services.findFreeCell(female);
            if (!position) return;
            factory.random({
                position,
                characteristics: Characteristics.inherited(
                    male.frog,
                    female.frog
                ),
            });
        });
    }
}
