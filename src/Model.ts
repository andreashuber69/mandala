export class Model {
    public readonly rings = 4;

    public get time() {
        return this.timeImpl;
    }

    public get mandalas() {
        return 2 ** this.time;
    }

    public get participants() {
        return ((2 ** this.rings) - 1) * this.mandalas;
    }

    public split() {
        this.timeImpl += 1;
    }

    private timeImpl = 0;
}
