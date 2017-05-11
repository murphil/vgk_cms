<template>
    <div class="brand" :class="customStyle" :style="customCss">
        <a href="/#">
            <img :src="this.content.img" :alt="alt" :title="alt">
        </a>
    </div>
</template>
<style scoped>
    .brand{
        display: flex;
        flex: 0 0 auto;
        align-items: center;
        justify-content: space-around;
    }
</style>
<script>
  import CR from '../../utils/CRMixin'
  export default{
    name: 'brand',
    mixins: [CR],
    data () {
      return {
        alt: `返回${this.content.brand}首页`,
      }
    }
  }
</script>