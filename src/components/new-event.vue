<template id="new-event-template">
  <div class="modal">
    <input id="modalNewEvent" type="checkbox" />
    <label for="modalNewEvent" class="overlay"></label>
    <article>
        <header>
          <h3>Új esemény</h3>
          <label for="modalNewEvent" class="close">&times;</label>
        </header>
        <section class="modal-content">
          <fieldset class="flex two">
            <label><input type="text" placeholder="Név" v-model="name"></label>
            <ul v-for="(op, index) in ops" :key="index">
              <li>{{op.text}}</li>
            </ul>
            <label><input type="text" placeholder="Válasz lehetőség..." v-model="op_text"></label>
            <label><button @click="addOpinion">Új Válasz lehetőség</button></label>
            <label>
              <input type="checkbox" v-model="type">
              <span class="checkable">Több válasz lehetőség</span>
            </label>
          </fieldset>
        </section>
        <footer>
          <label for="modalNewEvent" class="button" @click="createEvent">Létrehozás!</label>
          <label for="modalNewEvent" class="button dangerous">
              Mégse
          </label>
        </footer>
    </article>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Opinion from '../models/opinion';

@Component({
  props: ['events']
})
export default class NewEventComponent extends Vue {
  name: string = '';
  type: number = 0;
  op_text: string = '';
  ops: Array<Opinion> = [];
  
  createEvent(): void {
    this.$props['events'].addEvent(this.name, this.ops, this.type, 'data/images/forest.jpg');
    this.name = '';
    this.type = 0;
    this.ops = [];
  }

  addOpinion(): void {
    let opinion = new Opinion(this.ops.length+1, this.op_text, 0);
    this.ops.push(opinion);
    this.op_text = '';
  }
}
</script>