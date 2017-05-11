<template>
    <div class="HolyGrail">
        <header>
            <slot name="header"></slot>
        </header>
        <div class="HolyGrail-body">
            <nav class="HolyGrail-nav">
                <slot name="nav"></slot>
            </nav>
            <div class="HolyGrail-content">
                <slot></slot>
            </div>
            <aside class="HolyGrail-ads">
                <slot name="ads"></slot>
            </aside>
        </div>
        <footer>
            <slot name="footer"></slot>
        </footer>
        <div class="modal">
            <slot name="modal"></slot>
        </div>
    </div>
</template>
<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: 'Mobile',
    props: ['columns', 'layout'],
  }
</script>
<style scoped>
    .HolyGrail .modal {
        display: none;
        position: fixed;
    }

    .HolyGrail {
        display: flex;
        min-height: 100vh;
        flex-direction: column;
    }

    header,
    footer {
        flex: 1;
    }

    .HolyGrail-body {
        display: flex;
        flex: 1;
    }

    .HolyGrail-content {
        flex: 1;
    }

    .HolyGrail-nav, .HolyGrail-ads {
        /* 两个边栏的宽度设为12em */
        flex: 0 0 12em;
    }

    .HolyGrail-nav {
        /* 导航放到最左边 */
        order: -1;
    }

    @media (max-width: 768px) {
        .HolyGrail-body {
            flex-direction: column;
            flex: 1;
        }

        .HolyGrail-nav,
        .HolyGrail-ads,
        .HolyGrail-content {
            flex: auto;
        }
    }

</style>