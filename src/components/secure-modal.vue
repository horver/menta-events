<template id="secure-modal-template">
  <div class="modal">
    <input :id="'modalSecure'+id" type="checkbox" v-model="closed"/>
    <label v-bind:for="'modalSecure'+id" class="overlay"></label>
    <article>
        <header>
          <h3>Biztos törlöd?</h3>
          <label v-bind:for="'modalSecure'+id" class="close">&times;</label>
        </header>
        <section>
          <error-box :errors="errors"></error-box>
          <label v-if="this.secure">
            <i class="material-icons input-type">lock</i>
            <input type="password" placeholder="Jelszó" v-model="pass">
          </label>
        </section>
        <footer>
          <label v-bind:for="'modalSecure'+id" @click="deleteEvent"><button class="button dangerous"><i class="material-icons">delete</i> Törlés</button></label>
        </footer>
    </article>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { EventBus } from '../event-bus';

@Component({
  props: ['id', 'secure']
})
export default class SecureModalComponent extends Vue {
  pass: string = '';
  closed: boolean = false;
  errors: Array<string> = [];

  deleteEvent(): void {
    if (this.$props['secure']) {
      fetch('backend/api/secure.php', {
            method: 'POST',
            headers: {},
            body: this.pass
      })
      .then(respone => {
        return respone.json()
      })
      .then(data => {
        this.errors = [];
        if (data.success) {
          this.$emit('delete_event');
          this.closed = false;
          EventBus.$emit('toastMsg', 'Esemény törölve!');
        } else {
          this.errors.push('Jelszó nem megfelelő!');
        }
      });
    } else {
      this.$emit('delete_event');
      this.closed = false;
      EventBus.$emit('toastMsg', 'Esemény törölve!');
    }
    
  }
}
</script>