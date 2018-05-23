<template id="toast-template">
    <div id="snackbar" :class="{'show': visible}">
        {{msg}}
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { EventBus } from '../event-bus';

@Component({
    props: {
        timeout: {
            type: Number,
            default: 3000 //Bug with CSS animation
        }
    }
})
export default class ToastComponent extends Vue {
    visible: boolean = false;
    msg: string = '';
    
    created () {
        // Listen for event via EventBus
        EventBus.$on('toastMsg', (msg: string) => {
            this.visible = true;
            this.msg = msg;
            setTimeout(() => { 
                this.visible = false;
            }, this.$props['timeout']);
        });
    }
}
</script>