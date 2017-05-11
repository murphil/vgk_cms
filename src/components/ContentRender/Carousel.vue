<template>
    <div class="block el-carousel">
        <el-carousel
                :height="CrHeight"
                :initial-index="content.props.initialIndex || 0"
                :type="content.props.card ? 'card' : null"
                :interval="content.props.interval"
                :trigger="content.props.trigger"
                :autoplay="content.props.autoplay"
                ref="inner">
            <el-carousel-item v-for="item in this.content.children">
                <ContentRender :content="item"/>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
  import CR from '../../utils/CRMixin'
  export default{
    name: 'Carousel',
    mixins: [CR],
    computed: {
      CrHeight(){
        return this.content.props && this.content.props.height || '400px'
      }
    },
    mounted: function () {
      let x = this.$refs.inner
    }
  }
</script>

<style>
    .el-carousel__item {
        display: flex;
        flex-flow: row wrap-reverse;
        justify-content: center;
        align-items: center;
        align-content: center;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: rgba(50, 50, 50, 0.98);
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: rgba(200, 200, 200, 0.98);
    }
</style>

