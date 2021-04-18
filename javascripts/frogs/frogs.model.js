// abstract class
class FrogModel {
    constructor(characteristics) {
        this.characteristics = characteristics;
        this.distance = 1;
        this.classList = ['frog'];
    }
}

export class FrogFemale extends FrogModel {
    constructor({ characteristics, position, lake }) {
        super(characteristics);

        this.distance = 2;
        this.classList = ['frog', 'female'];

        lake.services.putFrog({ newPosition: position, frog: this });
    }
}

export class FrogMale extends FrogModel {
    constructor({ characteristics, position, lake }) {
        super(characteristics);

        this.distance = 3;
        this.classList = ['frog', 'male'];

        lake.services.putFrog({ newPosition: position, frog: this });
    }
}

export default class FrogFactory {
    constructor(lake) {
        this.lake = lake;
    }

    male(params) {
        new FrogMale({ ...params, lake: this.lake });
    }

    female(params) {
        new FrogFemale({ ...params, lake: this.lake });
    }
    random(params) {
        const gender = Math.random() > 0.5 ? 'male' : 'female';
        this[gender](params);
    }
}
