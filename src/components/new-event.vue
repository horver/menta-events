<template id="new-event-template">
  <div class="modal">
    <input id="modalNewEvent" type="checkbox" />
    <label for="modalNewEvent" class="overlay"></label>
    <article>
        <header>
          <input type="text" placeholder="Név" v-model="name">
        </header>
        <section class="modal-content">
          <div v-for="(op, index) in ops" :key="index" class="opinion-div">
              <i v-if="type" class="material-icons small input-type">check_box</i>
              <i v-else class="material-icons small input-type">radio_button_unchecked</i>
              <input type="text" placeholder="Választási lehetőség..." v-model="op.text" @keyup="addOpinion(index)">
              <span class="input-span" @click="deleteOpinion(index)"><i class="material-icons">backspace</i></span>
          </div>
          <fieldset>
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
          <label for="modalNewEvent" class="button success" @click="createEvent"><i class="material-icons">save</i> Mentés</label>
          <label for="modalNewEvent" class="button dangerous" @click="closeModal"><i class="material-icons">block</i> Mégse</label>
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
  ops: Array<Opinion> = [new Opinion(0, '', 0, [])];
  addable: boolean = false;
  
  createEvent(): void {
    this.ops.pop(); // filter out empty opinions!
    this.$props['events'].addEvent(this.name, this.ops, this.type, 'data/images/logo.png', this.addable, 0);
    this.name = '';
    this.type = 0;
    this.ops = [new Opinion(0, '', 0, [])];
  }

  addOpinion(index: number): void {
    if (index == this.ops.length-1) {
      let maxId = Math.max.apply(Math, this.ops.map(op => { return op.id; }));
      let opinion = new Opinion(maxId+1, '', 0, []);
      this.ops.push(opinion);
    }
  }

  deleteOpinion(index: number): void {
    if (index != this.ops.length-1)
      this.ops.splice(index, 1);
  }

  closeModal(): void {
    this.name = '';
    this.type = 0;
    this.ops = [new Opinion(0, '', 0, [])];
    this.addable = false;
  }
}
</script>