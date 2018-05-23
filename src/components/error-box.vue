<template id="error-box-template">
    <div v-if="errors.length">
        <article class="card alert-box error" v-for="(error, index) in errors" :key="index">
            <i class="material-icons">error</i>{{error}}
        </article>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
    props: ['errors'],
})
export default class ErrorBoxComponent extends Vue {
}
</script>