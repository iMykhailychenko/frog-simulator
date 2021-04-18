import Actions from './actions.js';
import FrogFactory from './frogs/frogs.model.js';
import LakeModel from './lake/lake.model.js';
import Characteristics from './assets/characteristics.js';

class Main {
    static run() {
        const lake = new LakeModel({ width: 10, height: 6 });
        const factory = new FrogFactory(lake);

        // init game with 2 frogs
        factory.female({
            position: { row: 0, cell: 0 },
            characteristics: Characteristics.random(),
        });
        factory.male({
            position: { row: 0, cell: 1 },
            characteristics: Characteristics.random(),
        });

        // init game actions
        const actions = new Actions(lake);
        actions.change();
        actions.jump();
        actions.reproduce(factory);
    }
}

Main.run();
