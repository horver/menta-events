<template id="secure-modal-template">
  <div class="modal">
    <input id="modalSecure" type="checkbox" />
    <label for="modalSecure" class="overlay"></label>
    <article>
        <header>
          Biztos törlöd?
        </header>
        <section class="modal-content">
          <i class="material-icons">lock</i>
          <input type="password" placeholder="Jelszó" v-model="pass">
        </section>
        <footer>
          <label for="modalSecure" @click="deleteEvent"><button class="button dangerous"><i class="material-icons">delete</i> Törlés</button></label>
          <label for="modalSecure" class="button" ><i class="material-icons">block</i> Mégse</label>
        </footer>
    </article>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
})
export default class SecureModalComponent extends Vue {
  pass: string = '';

  deleteEvent(): void {
    fetch('backend/api/secure.php', {
            method: 'POST',
            headers: {},
            body: this.pass
      })
      .then(respone => {
        return respone.json()
      })
      .then(data => {
        if (data.success) {
          this.$emit('delete_event');
          console.log('emitted');
        }
      });
  }
}
</script>