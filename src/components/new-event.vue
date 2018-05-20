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
            Választási lehetőségek:
            <div v-for="(op, index) in ops" :key="index" class="opinion-div">
                <span v-if="type">
                  <i class="material-icons small input-type">check_box</i>
                </span>
                <span v-else>
                  <i class="material-icons small input-type">radio_button_checked</i>
                </span>
                <input type="text" placeholder="Választási lehetőség..." v-model="op.text" @keyup.delete.exact="deleteOpinion(index, false)" @keyup="addOpinion(index)">
                <span class="input-span" @click="deleteOpinion(index, true)">&times;</span>
            </div>
            <div>Opciók:</div>
            <label>
              <input type="checkbox" v-model="type">
              <span class="checkable">Többet lehet választani</span>
            </label>
            <label>
              <input type="checkbox" v-model="addable">
              <span class="checkable">Hozzáadhatnak lehetőségeket</span>
            </label>
          </fieldset>
        </section>
        <footer>
          <label for="modalNewEvent" class="button success" @click="createEvent">Létrehozás!</label>
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
  ops: Array<Opinion> = [new Opinion(0, '', 0)];
  addable: boolean = false;
  
  createEvent(): void {
    // Todo filter out empty opinions!
    this.$props['events'].addEvent(this.name, this.ops, this.type, 'data/images/forest.jpg', this.addable);
    this.name = '';
    this.type = 0;
    this.ops = [];
  }

  addOpinion(index: number): void {
    if (index == this.ops.length-1) {
      let maxId = Math.max.apply(Math, this.ops.map(op => { return op.id; }));
      let opinion = new Opinion(maxId+1, this.op_text, 0);
      this.ops.push(opinion);
      this.op_text = '';
    }
  }

  deleteOpinion(index: number, clicked: boolean): void {
    if ((clicked || this.ops[index].text == '') && index != this.ops.length-1)
      this.ops.splice(index, 1);
  }
}
</script>