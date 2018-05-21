<template id="event-list-template">
    <article class="card event-list">
        <header>
            <h3 @click="onClick()" style="cursor: pointer">{{event.name}}</h3>
            <label @click="deleteEvent(event.id)" class="close"><i class="material-icons">delete</i></label>
        </header>
        <img :src="event.img" @click="onClick()" class="center">
        <footer v-if="showOpinions">
            <!-- List opinions either be checkbox or radio buttons -->
            <div v-for="(op, index) in event.ops" :key="index">
                <fieldset>
                    <div v-if="event.type" class="progressCheck">
                        <label>
                            <input type="checkbox" :value="op.id" v-model="checkedOps" @change="updateArray()">
                            <span class="checkable">{{op.text}} -> {{op.votes}}/{{event.votes}}</span>
                            <div class="progress-container">
                                <div class="progress-bar" v-if="op.votes > 0" v-bind:style="{width: op.votes/event.votes*100+'%'}">{{op.votes/event.votes*100 | floor}}%</div>
                            </div>
                            <span v-for="(voter, __index) in op.voters" :key="__index">
                                {{voter}}  
                            </span>
                        </label>
                    </div>
                    <span v-else>
                        <label>
                            <input type="radio" :name="event.name" :value="op.id" v-model="selectedOp" @change="updateArray()">
                            <span class="checkable">{{op.text}} -> {{op.votes}}/{{event.votes}}</span>
                            <div class="progress-container">
                                <div class="progress-bar" v-if="op.votes > 0" v-bind:style="{width: op.votes/event.votes*100+'%'}">{{op.votes/event.votes*100 | floor}}%</div>
                            </div>
                            <span v-for="(voter, __index) in op.voters" :key="__index">
                                {{voter}}  
                            </span>
                        </label>
                    </span>
                </fieldset>
            </div>
            <!-- Add new opinions in event -->
            <div v-for="(_op, _index) in ops" :key="_index">
                <div v-if="event.addable">
                    <input type="text" placeholder="Más..." v-model="_op.text" @keydown="addOpinion(_index)" @keyup="deleteOpinion(_index)">
                </div>
            </div>
            <br><br>
            <!-- Submit vote -->
            <input type="text" placeholder="Neved" v-model="voterName">
            <button for="modalEvent" @click="voteEvent()" :disabled="!(((checkedOps.length > 0) || (ops.length > 1)) && voterName != '')"><i class="material-icons">how_to_reg</i> Szavazok</button>
        </footer>
    </article>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Opinion from '../models/opinion';

@Component({
  props: ['event','events'],
  filters: {
      floor: function(value: any) {
          return Math.floor(value);
      }
  }
})
export default class EventItemComponent extends Vue {
    showOpinions: boolean = false;
    
    checkedOps: Array<number> = [];
    selectedOp: number = -1;
    
    voterName: string = '';

    ops: Array<Opinion> = [];

    addOpinion(index: number): void {
        if (index == this.ops.length-1) {
            let maxId = Math.max.apply(Math, this.ops.map(op => { return op.id; }));
            let opinion = new Opinion(maxId+1, '', 0, []);
            this.ops.push(opinion);
        }
        
    }

    deleteOpinion(index: number): void {
        if (index != this.ops.length-1)
            if (this.ops[index].text == '')
                this.ops.splice(index, 1);
    }

    deleteEvent(id: number): void {
        this.$props['events'].deleteEvent(id);
    }

    onClick(): void {
        this.showOpinions = !this.showOpinions;
        this.ops = [];
        this.ops.push(new Opinion(this.$props['event'].getOpMaxId()+1, '', 0, []));
    }

    updateArray(): void {
        if (this.selectedOp != -1)
            this.checkedOps[0] = this.selectedOp;

        this.checkedOps.push(0);
        this.checkedOps.pop();
    }

    voteEvent(): void {
        if (this.checkedOps.length > 0 || this.ops.length > 1) {
            if (this.checkedOps.length > 0) {
                this.$props['event'].vote(this.checkedOps, this.voterName); 
                this.checkedOps = [];
            }
            
            if (this.ops.length > 1) {
                 this.ops.pop();
                this.$props['event'].addNewOps(this.ops, this.voterName);
                this.ops = [];
                this.ops.push(new Opinion(this.$props['event'].getOpMaxId()+1, '', 0, []));
            }
            
            this.$props['events'].update();
            this.voterName = '';
        }
    }
}
</script>