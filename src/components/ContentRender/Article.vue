<template>
    <div class="Article">
        <div class="title">
            <h3>{{content.title}}</h3>
            <div class="desc">
                <div>{{content.category_uri}}</div>
                <div> //</div>
                <div>{{content.uri}}</div>
            </div>
        </div>

        <div class="desc">
            <div>{{content.author}}</div>
            <div>{{content.created_at}}</div>
            <div>{{content.updated_at}}</div>
        </div>

        <slot></slot>
    </div>
</template>
<style scoped>
    .Article {
        display: flex;
        flex-flow: column nowrap;
        flex: 1 1 100%;
    }

    .title {
        display: flex;
        flex-flow: row nowrap;
    }

    .desc {
        color: #afce9f;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
    }
</style>
<script>
  import CR from '../../utils/CRMixin'
  export default{
    name: 'Article',
    mixins: [CR],
  }
</script>