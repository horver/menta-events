<template id="event-list-template">
    <div class="flex three center">
        <div v-for="(event, index) in events.event_list" :key="index">
            <event-item v-bind:event=event v-bind:events=events></event-item>
        </div>
        <div v-if="events.event_list.length == 0">
            <article class="card alert-box">
                <header>
                    <h3>Nincsenek események!</h3>
                </header>
            </article>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
    props: ['events'],
})
export default class EventListComponent extends Vue {
}
</script>