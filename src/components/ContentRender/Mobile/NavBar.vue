<template>
    <div class="navbar">
        <slot></slot>
    </div>
</template>
<style scoped>
    .navbar {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: stretch;
        flex: 1 1 100%;
    }
</style>
<script>
  export default{
    name: 'nav-container'
  }
</script>