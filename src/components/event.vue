<template id="event-template">
  <div class="modal">
    <input id="modalEvent" type="checkbox" />
    <label for="modalEvent" class="overlay"></label>
    <article>
        <header>
          <h3>{{event.name}}</h3>
          <label for="modalEvent" class="close">&times;</label>
        </header>
        <section class="modal-content">
        </section>
        <footer>
          <label for="modalEvent" class="button dangerous">
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
  props: ['event', 'events']
})
export default class EventComponent extends Vue {///
}
</script>