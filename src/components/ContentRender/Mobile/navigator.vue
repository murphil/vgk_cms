<template>
</template>
<style>
    .tabbar {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-around;
        flex: 1 1 auto;
    }
</style>
<script>
  import {mapActions, mapGetters} from 'vuex'

  export default{
    name: 'navigator',
    components: {
    },
    computed: {
      ...mapGetters([
        'getColumn',
      ])
    },
  }
</script>
