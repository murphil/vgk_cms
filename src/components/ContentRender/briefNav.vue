<template>
    <div class="nav-link">
        <ul>
            <li>
                <router-link :to="getColumn.path || ''" :class="{'link-active': currentColumn === getColumn.uri}">{{ getColumn.name }}</router-link>
            </li>
            <li v-if="getColumn.children && getColumn.children.length > 0" v-for="child in getColumn.children">
                <router-link :to="child.path || ''" :class="{'link-active': currentColumn === child.uri}">{{ child.name }}</router-link>
            </li>
        </ul>
    </div>
</template>
<script>
  import {mapGetters, mapState} from 'vuex'

  export default{
    name: 'brief-nav',
    computed: {
      ...mapGetters([
        'getColumn',
      ]),
      ...mapState([
        'currentColumn'
      ])
    },
  }
</script>
<style>
    .nav-link {
        display: flex;
        justify-content: flex-start;
        flex: 1 1 100%;
        z-index: 1000;
        margin-right: 20em;
    }
    .nav-link ul {
        flex:1 1 100%;
        display: flex;
        margin: 0;
        justify-content:center;
    }

    .nav-link ul li{
        flex:1 1 100%;
        display: flex;
        justify-content:center;
    }


    .nav-link ul li a{
        display: flex;
        flex:1 1 100%;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: center;
        font-size:1em;
        color: #FFFFFF;
        text-decoration:none;
        border-bottom: 0.3rem solid #22282d;
        transition: color 0.5s ease, border 0.5s ease;
    }
    .nav-link ul li a:hover,
    .nav-link ul li .link-active{
        color: #5bb647;
        border-bottom: 0.3rem solid #5bb647;
    }

</style>