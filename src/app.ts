import Vue from "vue";

import Events from './models/events';
import NewEventComponent from './components/new-event.vue';
import EventItemComponent from './components/event-item.vue';
import EventComponent from './components/event.vue';

let events = new Events();

Vue.component('new-event', NewEventComponent);
Vue.component('event-item', EventItemComponent);
Vue.component('event', EventComponent);

var app = new Vue({
    el: '#app',
    data: {
      events: events
    }
});

events.load();