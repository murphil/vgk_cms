<template>
    <div class="TPX">
        <header>
            <slot name="header"></slot>
        </header>
        <div class="TPX-body">
            <div class="TPX-top"></div>
            <div class="TPX-content">
                <slot></slot>
            </div>
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
  export default {
    name: 'TPX',
    props: ['columns', 'layout'],
  }
</script>
<style>
    .TPX {
        display: flex;
        min-height: 100vh;
        flex-direction: column;
    }

    header {
        position: fixed;
        width: 100%;
        z-index: 1000;
    }

    footer {
        flex: 1 0 100%;
    }

    .TPX-top {
        height: 3em;
        background-color: black;
    }

    .TPX-body {
        display: flex;
        flex-flow: column nowrap;
        flex: 1;
    }

    .TPX-content {
        flex: 1;
    }

    .TPX .modal {
        display: none;
        position: fixed;
    }

    @media (max-width: 768px) {
        .TPX-body {
            flex-direction: column;
            flex: 1;
        }
        .TPX-content {
            flex: auto;
        }
    }

</style>