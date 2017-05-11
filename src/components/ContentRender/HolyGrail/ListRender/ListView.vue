<template>
  <div>
    <div v-for="l in list">
      <component :is='child' :item='l' :brief="brief" :path="path"/>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'ListView',
    props: ['list', 'child', 'brief', 'path']
  }
</script>
