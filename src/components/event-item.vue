<template id="event-list-template">
    <article class="card">
        <header>
            <h3>{{event.name}}</h3>
             <label @click="deleteEvent(event.id)" class="close">&times;</label>
        </header>
        <img :src="event.img">
        <footer>
            <button for="modalEvent" >Szavazok</button>
        </footer>
    </article>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: ['event','events']
})
export default class EventItemComponent extends Vue {
    deleteEvent(id: number): void {
        this.$props['events'].deleteEvent(id);
    }
}
</script>