<template>
    <div>
        <div style="color: #eee8d5;" class="article-item">
            <router-link :to="iPath">
                <strong>{{item.title}}</strong>
            </router-link>
            <span v-if="item.author && !brief" style="color: #eee8d5;">
                <strong>{{item.author}}</strong>
            </span>
            <span v-if="item.updated_at" style="color: #555;font-size: 0.3em">
                {{updated}}更新
            </span>
            <span v-if="item.created_at && !brief" style="color: #c2c2c2;">
                <strong>{{item.created_at}}</strong>
            </span>
        </div>
        <div v-if="!brief">{{item.content.payload}}</div>
    </div>
</template>
<script>
  import moment from 'moment'
  export default {
    name: 'ListItem',
    props: ['item', 'brief', 'path'],
    computed: {
      iPath(){
        return `${this.path}/${this.item.uri}`
      },
      updated(){
        return moment(this.item.updated_at).format('YY年M月D日 h点m分')
      }
    }
  }
</script>
<style>
    .article-item a {
        color: #eee8d5;
    }
</style>
