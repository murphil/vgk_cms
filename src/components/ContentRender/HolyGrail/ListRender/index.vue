<template>
  <ListView :list='list' :child='child' :brief="brief" :path="path"/>

</template>
<script>
  import ListView from './ListView.vue'
  import ListItem from './ListItem.vue'

  export default {
    name: 'ListRender',
    props: ['list', 'brief', 'path'],
    data() {
      return {
        child: ListItem
      }
    },
    components: {
      ListView, ListItem
    }
  }
</script>
