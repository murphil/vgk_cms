<template>
    <div class="outer">
        <router-link :to="tree.path || ''">{{ tree.name }}</router-link>
        <ul class="menu">
            <template v-if="tree.children && tree.children.length > 0">
                <li v-for="child in tree.children">
                    <TreeView :tree="child"/>
                </li>
            </template>
        </ul>
    </div>
</template>
<script>
  export default {
    name: "TreeView",
    components: {},
    data () {
      return {
        displayChildren: false
      }
    },
    props: ['tree'],
    created () {

    }
  }
</script>
<style scoped>
</style>
