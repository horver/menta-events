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

    public addEvent(name: string, ops: Array<Opinion>, type: number, img: string, addable: boolean) {
        let event = new Event(this.getMaxId()+1, name, ops, type, img, addable);
        this.event_list.push(event);
        this.update();
    }
    
    public deleteEvent(id: number) {
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
            this.update();
        }
    }

    private restReceive<T>(url: string): Promise<T> {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            });
    }
    
    private restSend(url: string) {
        fetch(url, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(this.event_list)
        });
    }

    public load(): void {
       this.restReceive<Array<Event>>('backend/api/list-events.php')
            .then(respone_data => {
                this.event_list = respone_data;
            });
    }

    public save() {
        fetch('backend/api/save-events.php', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.event_list)
      });
    }

    public update() {
        this.save();
        this.load();
    }
}