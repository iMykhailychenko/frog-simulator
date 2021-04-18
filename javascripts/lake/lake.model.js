import refs from '../assets/references.js';
import LakeServices from './lake.servises.js';

export default class LakeModel {
    static _instance = null; // singleton

    constructor({ width, height }) {
        if (LakeModel._instance) return LakeModel._instance;

        LakeModel._instance = this;
        this.width = width;
        this.height = height;
        this.matrix = this.generateMatrix();

        // injection
        this.services = new LakeServices(this.matrix);
    }

    generateMatrix() {
        const matrix = [];
        refs.inputs.forEach((input, index) => {
            if (!(index % this.width)) matrix.push([]);
            matrix[Math.floor(index / this.width)].push({ input, frog: null });
        });
        return matrix;
    }
}
