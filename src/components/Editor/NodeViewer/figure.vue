<template>
    <img :src="content.img">
</template>
<script>
    export default {
      props: ['content'],
      name: 'figure-viewer'
    }
</script>