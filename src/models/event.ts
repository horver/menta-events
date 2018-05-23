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
    addable: boolean;
    votes: number;
    secure: boolean;
    anonim: boolean;

    constructor(id: number, name: string, ops: Array<Opinion>, type: OpinionType, img: string, 
                addable: boolean, votes: number, secure: boolean, anonim: boolean) {
        this.id = id;
        this.name = name;
        this.ops = ops.sort((a, b) => { 
            if (a.votes < b.votes)
                return 1;
            return 0;
         });
        this.type = type;
        this.img = img;
        this.addable = addable;
        this.votes = votes;
        this.secure = secure;
        this.anonim = anonim;
    }

    public vote(checkedOps: Array<number>, voterName: string): void {
        for (let checked_op of checkedOps) {
            for (let op of this.ops) {
                if (op.id == checked_op) {
                    op.votes++;
                    op.voters.push(voterName);
                }
            }
        }
        this.votes++;
    }

    public getOpMaxId(): any {
        return Math.max.apply(Math, this.ops.map(op => { return op.id; }));
    }

    public addNewOps(ops: Array<Opinion>, voterName: string): void {
        for (let op of ops) {
            op.votes = 1;
            op.voters.push(voterName);
            this.ops.push(op);
        }
        this.votes++;
    }
}