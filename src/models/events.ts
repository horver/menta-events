import Event from './event';
import Opinion from './opinion';
  
export default class Events {
    event_list: Array<Event>;

    constructor() {
        this.event_list = [];
    }

    public getMaxId(): any {
        let max: number = 0;
        for (let ev of this.event_list) {
            if (ev.id > max)
                max = ev.id;
        }

        return max;
    }

    public addEvent(name: string, ops: Array<Opinion>, type: number, img: string, 
                    addable: boolean, votes: number, secure: boolean, anonim: boolean): void {
        // Before write update dara from backend
        //this.load();
        let event = new Event(this.getMaxId()+1, name, ops, type, img, addable, votes, secure, anonim);
        this.event_list.push(event);
        this.save();
    }
    
    public deleteEvent(id: number): void {
        // Before write update data from backend
        //this.load();
        let index: number = -1;

        this.event_list.some(function(el, i) {
            if (el.id == id) {
                index = i;
                return true;
            }
            return false;
        });
        if (index > -1) {
            this.event_list.splice(index, 1);
            this.save();
        }
    }

    private restReceive<T>(url: string): Promise<T> {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .catch(error => { console.log(error); });
    }

    public load(): void {
        this.event_list = [];
        this.restReceive<Array<Event>>('backend/api/list-events.php')
            .then(respone_data => {
                for (let ev of respone_data) {
                    let ops = Array<Opinion>();
                    for (let op of ev.ops) {
                        ops.push(new Opinion(op.id, op.text, op.votes, op.voters));
                    }
                    let event = new Event(ev.id, ev.name, ops, ev.type, ev.img, 
                                          ev.addable, ev.votes, ev.secure, ev.anonim);
                    this.event_list.push(event);
                }
            });
    }

    public save(): void {
        // TODO Amikor két kliens A és B állapottal van, akkor mindig az kerül be a .json fileba amit legutoljára írtak
        // TODO versenyhelyzet kezelése
        fetch('backend/api/save-events.php', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.event_list)
      });
    }
}