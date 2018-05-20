export default class Opinion {
    id: number;
    text: string;
    votes: number;
    
    constructor(id: number, text: string, votes: number) {
        this.id = id;
        this.text = text;
        this.votes = votes;
    }
}