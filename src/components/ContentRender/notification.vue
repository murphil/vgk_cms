<template>
  <div class="message" :class="customStyle" :style="customCss">
    {{lastMessage}}
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import CR from '../../utils/CRMixin'
  export default{
    name: 'message',
    mixins: [CR],
    computed: {
      ...mapGetters(['lastMessage']),
    },
  }
</script>
<style>
  .message {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    flex: 1 1 auto;
    font-size: 12px;
  }
</style>
