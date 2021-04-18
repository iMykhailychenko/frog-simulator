export default class Characteristics {
    static random() {
        return [
            Math.random() > 0.5 ? 'tall' : 'fat',
            Math.random() > 0.5 ? 'short' : 'slim',
        ];
    }
    static inherited(parent1, parent2) {
        return [
            Math.random() > 0.5
                ? parent1.characteristics[0]
                : parent2.characteristics[1],
            Math.random() > 0.5
                ? parent1.characteristics[2]
                : parent2.characteristics[3],
        ];
    }
}
