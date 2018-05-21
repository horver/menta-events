export default class Opinion {
    id: number;
    text: string;
    votes: number;
    voters: Array<string>;
    
    constructor(id: number, text: string, votes: number, voters: Array<string>) {
        this.id = id;
        this.text = text;
        this.votes = votes;
        this.voters = voters;
    }
}