export default class Printer {
    constructor(lakeServices) {
        this.lakeServices = lakeServices;
    }

    init({ newPosition }) {
        const newCell = this.lakeServices.getCellByPosition(newPosition);
        newCell.input.parentNode.classList.add(...newCell.frog.classList);
    }

    rerender({ newPosition, oldPosition }) {
        const oldCell = this.lakeServices.getCellByPosition(oldPosition);
        oldCell.input.parentNode.classList.remove(...oldCell.frog.classList);
        //
        const newCell = this.lakeServices.getCellByPosition(newPosition);
        newCell.input.parentNode.classList.add(
            ...oldCell.frog.classList /* use oldCell insted of newCell */
        );
    }
}
