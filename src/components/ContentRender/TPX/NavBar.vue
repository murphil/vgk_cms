<template>
    <div class="nav">
        <slot></slot>
    </div>
</template>
<style>
    .nav{
        display: flex;
        flex: 1 1 100%;
        justify-content:space-between;
        background-color: #22282d;
        z-index: 1000;
    }
</style>
<script>
  export default{
    name: 'navbar-container'
  }
</script>