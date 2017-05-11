<template>
    <div class="property-editor-payload">
        <textarea :value="value" @input="changeProperty"/>
        <div>
            preview
        </div>
    </div>
</template>
<script>
  import mix from '../mixin'
  export default {
    name: 'payload',
    mixins: [mix]
  }
</script>
<style>
    .property-editor-payload {
        display: flex;
        flex-flow: row;
    }

    .property-editor-payload > *:nth-child(2) {
        border: 1px dashed green;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1em;
    }
</style>