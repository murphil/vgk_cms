<template>
    <component :is="ConcreteComponent" :layout="layout" :columns="columns">
        <template v-if="layout && layout.header"
                  slot="header">
            <ContentRender :content="layout.header" />
        </template>
        <template v-if="layout && layout.footer"
                  slot="footer">
            <ContentRender :content="layout.footer" />
        </template>
        <router-view></router-view>
        <template v-if="layout && layout.nav"
                  slot="nav">
            <ContentRender :content="layout.nav" />
        </template>
        <template v-if="layout && layout.ads"
                  slot="ads">
            <ContentRender :content="layout.ads" />
        </template>
        <template v-if="layout && layout.modal"
                  slot="modal">
            <ContentRender :content="layout.modal" />
        </template>
    </component>
</template>

<script>
  import {getComponent} from './__typeToComponent.vue'
  import ContentRender from '../ContentRender'

  export default{
    name: 'LayoutRender',
    props: ['layout', 'columns'],
    components: {
      ContentRender
    },
    computed: {
      ConcreteComponent () {
        if (!this.layout) {
          return getComponent('noExistThisType')
        } else {
          return getComponent(this.layout.type)
        }
      }
    }
  }

</script>

