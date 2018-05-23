import Vue from 'vue';

import Events from './models/events';
import NewEventComponent from './components/new-event.vue';
import EventItemComponent from './components/event-item.vue';
import SecureModalComponent from './components/secure-modal.vue';
import EventListComponent from './components/event-list.vue';
import ErrorBoxComponent from './components/error-box.vue';
import ToastComponent from './components/toast.vue';

let events = new Events();

// Register components
Vue.component('new-event', NewEventComponent);
Vue.component('event-item', EventItemComponent);
Vue.component('secure-modal', SecureModalComponent);
Vue.component('event-list', EventListComponent);
Vue.component('error-box', ErrorBoxComponent);
Vue.component('toast', ToastComponent);

// Main app
var app = new Vue({
    el: '#app',
    data: {
      events: events
    }
});

events.load();