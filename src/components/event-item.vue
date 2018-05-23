<template id="event-item-template">
    <article class="card event-list">
        <header>
            <label @click="onClick()" style="cursor: pointer;">
                <i class="material-icons">{{showOpinions?'remove_circle':'add_circle'}}</i>
            </label>
            <h3 @click="onClick()" style="cursor: pointer">{{event.name}}</h3>
            <label v-bind:for="'modalSecure'+event.id" class="close"><i class="material-icons">delete</i></label>
        </header>
        <secure-modal :id="event.id" :secure="event.secure" @delete_event="deleteEvent"></secure-modal>
        <img :src="event.img" v-if="!showOpinions" @click="onClick()" class="img-center">
        <footer v-if="showOpinions">
            <!-- List opinions either be checkbox or radio buttons -->
            <fieldset>
                <div v-for="(op, index) in event.ops" :key="index">
                    <label v-if="event.type">
                        <input type="checkbox" :value="op.id" v-model="checkedOps" @change="updateArray()">
                        <span class="checkable">{{op.text}}</span>
                    </label>
                    <label v-else>
                        <input type="radio" :name="event.name" :value="op.id" v-model="selectedOp" @change="updateArray()">
                        <span class="checkable">{{op.text}}</span>
                    </label>
                    <div class="progress-container">
                        <div class="progress-bar" v-if="op.votes > 0" v-bind:style="{width: op.votes/event.votes*100+'%'}">
                            {{op.votes/event.votes*100 | floor}}%
                        </div>
                    </div>
                    <span class="label" v-if="!event.anonim" v-for="(voter, __index) in op.voters" :key="__index">{{voter}}</span>
                    <span style="right: 5px; position: absolute;" class="label warning">{{op.votes}}/{{event.votes}}</span>
                </div>
            </fieldset>
            <!-- Add new opinions in event -->
            <br>
            <span v-if="event.addable"><i class="material-icons">playlist_add</i></span>
            <br>
            <div v-for="(_op, _index) in ops" :key="_index">
                <div v-if="event.addable">
                    <input type="text" placeholder="Más..." v-model="_op.text" @keydown="addOpinion(_index)" @keyup="deleteOpinion(_index)">
                </div>
            </div>
            <br><br>
            <!-- Submit vote -->
            <div class="flex three">
                <div class="third">
                    <input type="text" placeholder="Neved" v-if="!event.anonim" v-model="voterName">
                </div>
                <div class="two-third">
                    <button for="modalEvent" @click="voteEvent()" :disabled="!(((checkedOps.length > 0) || (ops.length > 1)) && voterName != '')"><i class="material-icons">how_to_reg</i> Szavazok</button>
                </div>
            </div>
        </footer>
    </article>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Opinion from '../models/opinion';

import { EventBus } from '../event-bus';

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

    created (): void {
        if (this.$props['event'].anonim)
            this.voterName = 'ANONIM';
    }

    addOpinion(index: number): void {
        if (index == this.ops.length-1 && this.ops[this.ops.length-1].text != '') {
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
        id = this.$props['event'].id; // ???
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
            
            this.$props['events'].save();
            this.voterName = '';
            if (this.$props['event'].anonim)
                this.voterName = 'ANONIM';
            EventBus.$emit('toastMsg', 'Köszönjük, hogy szavaztál!');
        }
    }
}
</script>