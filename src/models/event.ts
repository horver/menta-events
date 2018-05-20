import Opinion from "./opinion";

enum OpinionType {
    Single,
    Multiple,
}

export default class Event {
    id: number;
    name: string;
    ops: Array<Opinion>;
    type: OpinionType;
    img: string;

    constructor(id: number, name: string, ops: Array<Opinion>, type: OpinionType, img: string) {
        this.id = id;
        this.name = name;
        this.ops = ops;
        this.type = type;
        this.img = img;
    }
}