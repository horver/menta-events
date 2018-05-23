<template id="new-event-template">
  <div class="modal">
    <input id="modalNewEvent" type="checkbox" v-model="closed" />
    <label for="modalNewEvent" class="overlay"></label>
    <article class="modal-large">
        <header>
          <input type="text" placeholder="Név" v-model="name">
        </header>
        <section>
          <error-box :errors="errors"></error-box>
          <fieldset class="flex two">
          <label v-for="(op, index) in ops" :key="index" class="off-fourth modal-input">
              <i v-if="type" class="material-icons input-type">check_box</i>
              <i v-else class="material-icons input-type">radio_button_unchecked</i>
              <input type="text" placeholder="Választási lehetőség..." v-model="op.text" @keyup="addOpinion(index)">
              <i class="material-icons input-span" @click="deleteOpinion(index)" v-if="index!=ops.length-1">backspace</i>
          </label>
          </fieldset>
          <div class="flex two">
            <div class="div-dropimage">
            <label class="dropimage">
              <input title="Húzz rá vagy katt rá" @change="fileChange($event.target.files)" type="file" accept="image/*">
            </label><!-- v-bind:style="{backgroundImage: `url(${img})`}"-->
            </div>
            <fieldset class="flex one">
              <label>
                <i class="material-icons">list</i>
                <input type="checkbox" v-model="type">
                <span class="checkable">Többet lehet választani</span>
              </label>
              <label>
                <i class="material-icons">playlist_add</i>
                <input type="checkbox" v-model="addable">
                <span class="checkable">Hozzáadhatnak lehetőségeket</span>
              </label>
              <label>
                <i class="material-icons">lock</i>
                <input type="checkbox" v-model="secure">
                <span class="checkable">Védett</span>
              </label>
              <label>
                <i class="material-icons">perm_identity</i>
                <input type="checkbox" v-model="anonim">
                <span class="checkable">Anonim</span>
              </label>
            </fieldset>
        </div>
        </section>
        <footer>
          <label class="button success" @click="createEvent"><i class="material-icons">save</i> Mentés</label>
          <label class="button dangerous" @click="closeModal"><i class="material-icons">block</i> Mégse</label>
        </footer>
    </article>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Opinion from '../models/opinion';
import {EventBus} from '../event-bus';

@Component({
  props: ['events']
})
export default class NewEventComponent extends Vue {
  // Event props
  name: string = '';
  type: number = 0;
  ops: Array<Opinion> = [new Opinion(0, '', 0, [])];
  addable: boolean = false;
  secure: boolean = false;
  anonim: boolean = false;
  img: string = 'data/images/logo.png';

  errors: Array<string> = [];
  closed: boolean = false;

  //TODO  képfeltöltés
  createEvent(): void {
    this.errors = [];
    if (this.name == '' || this.name == ' ') // Need some regex pattern
      this.errors.push('Adj az eseménynek nevet!');

    if (this.ops.length < 3)
      this.errors.push('Legalább két választási lehetőség legyen!');

    if (this.errors.length == 0) {
      this.ops.pop(); // filter out empty opinions!
      this.$props['events'].addEvent(this.name, this.ops, this.type, this.img, 
                                     this.addable, 0, this.secure, this.anonim);
      // Send toast event
      EventBus.$emit('toastMsg', this.name+' esemény mentve!');
      this.closeModal();
    }
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
      this.ops.splice(index, 1);
    this.ops.push(new Opinion(0, '', 0, []));
    this.ops.pop();
  }

  fileChange (files: any): void {
    let reader = new FileReader();
    let elem = <HTMLElement>document.querySelector('.dropimage');
    reader.onloadend = () => {
      this.img = reader.result;
      elem.style.backgroundImage = 'url('+reader.result+')'; // TODO: vuesni
    }
    
    reader.readAsDataURL(files[0]);
  }

  closeModal(): void {
    this.closed = false; // Close the modal

    // Clear fields
    this.name = '';
    this.type = 0;
    this.ops = [new Opinion(0, '', 0, [])];
    this.addable = false;
    this.secure = false;
    this.anonim = false;
    this.errors = [];
    this.img = 'data/images/logo.png';
    let elem = <HTMLElement>document.querySelector('.dropimage');
    elem.style.backgroundImage = ''; // TODO: vuesni
  }
}
</script>