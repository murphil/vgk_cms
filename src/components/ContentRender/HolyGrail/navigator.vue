<template>
    <TreeView :tree="getColumn"/>
</template>
<style>

</style>
<script>
  import TreeView from './TreeView'
  import {mapActions, mapGetters} from 'vuex'

  export default{
    name: 'navigator',
    components: {
      TreeView
    },
    computed: {
      ...mapGetters([
        'getColumn',
      ])
    },
  }
</script>
