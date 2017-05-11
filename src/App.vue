<template>
  <LayoutRender :layout="getLayout" :columns="getColumn" />
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import LayoutRender from './components/LayoutRender'
  //import gql from 'graphql-tag'

  export default {
    name: 'app',
    components: {
      LayoutRender
    },
    computed: {
      ...mapGetters([
        'getColumn',
        'getLayout'
      ])
    },
    methods: {
      ...mapActions([
        'initColumnTree',
      ])
    },
    /*
    apollo: {
      test: {
        query: gql`query
          layout($name:String){
            payload
          }`,
        variables: {
          name: "main"
        }
      }
    },
    */
    async beforeCreate (){
      try {
        // 此时methods还未创建
        this.$store.dispatch('initColumnTree', window.screen.width > 786 ? "TPX" : "Mobile") //HolyGrail
      } catch (e) {
        console.log(e)
      }
    }
  }
</script>

<style>
  fieldset {
    border-radius: 0.15em;
    border: 1px solid #f5f5f5;
    margin: 1em 0
  }

  fieldset legend {
    font-weight: 400;
    padding: 0 0.25em
  }

  input,select,textarea {
    -moz-appearance: none;
    -o-appearance: none;
    -ms-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    border-radius: 0.15em;
    border: 1px solid #ddd;
    box-shadow: none;
    color: #444;
    display: block;
    font-family: "Helvetica Neue", Helvetica, Sans-Serif;
    font-size: inherit;
    outline: none;
    padding: 0.49em 0.5em
  }

  input:hover,input:focus,select:hover,select:focus,textarea:hover,textarea:focus {
    border-color: #94d499;
    transition: all 200ms ease-in-out
  }

  input:focus,select:focus,textarea:focus {
    box-shadow: 0 0 10px rgba(148, 212, 153, 0.2)
  }

  textarea {
    padding: 0.5em
  }

  select {
    background-image: url('data:image/svg+xml;utf8,<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><polyline points="114.3,212.8 388,212.8 251.1,0 114.3,212.8 "/><polyline points="388,297.9 114.3,297.9 251.1,510.7 388,297.9 "/></svg>');
    background-color: #FFF;
    background-size: 1em;
    background-repeat: no-repeat;
    background-position: 99% 50%;
    line-height: 1.1;
    padding: 0.78em 0.5em;
    padding-right: 1.4em
  }

  input:not(.btn):not([type='checkbox']):not([type='radio']) {
    min-height: 2.7em
  }

  input[type='file'] {
    background-color: #FFF;
    width: 100%;
    font-size: 12px;
    padding: 1.02em 0.5em
  }

  input[type='range'] {
    padding: 0.87em 0.1em
  }

  input[type='range']:focus {
    outline: 0
  }

  input[type='search'] {
    box-sizing: border-box !important;
    -moz-appearance: none;
    -o-appearance: none;
    -ms-appearance: none;
    -webkit-appearance: none;
    appearance: none
  }

  input[type='checkbox'],input[type='radio'] {
    background-color: #FFF;
    border: 1px solid #888;
    display: inline-block;
    height: 1em;
    margin: 0 0.3em -0.1em 0;
    padding: 0;
    position: relative;
    top: 0;
    width: 1em;
    overflow: hidden
  }

  input[type='checkbox']:checked,input[type='radio']:checked {
    background-color: #94d499;
    border-color: #94d499
  }

  input[type='checkbox']:disabled,input[type='radio']:disabled {
    opacity: 0.3
  }

  input[type='checkbox'] {
    border-radius: 0.15em
  }

  input[type='checkbox']:checked {
    border: none
  }

  input[type='checkbox']:checked:before {
    bottom: 0;
    color: white;
    content: "\f101";
    font-family: "icons", helvetica, Sans-Serif;
    font-size: 1em;
    left: 0;
    line-height: 1;
    position: absolute;
    right: 0;
    text-align: center;
    top: 0
  }

  input[type='radio'] {
    border-radius: 99em
  }

  input[type='radio']:checked:before {
    color: white;
    content: " ";
    height: 1em;
    overflow: hidden;
    position: absolute;
    text-align: center;
    top: 0;
    width: 1em
  }

  @media screen and (-webkit-min-device-pixel-ratio: 0) {
    input:not(.btn):not([type='checkbox']):not([type='radio']),select,textarea {
      min-height:2.7em
    }
  }

  @-moz-document url-prefix() {
    input[type='file'] {
      padding: 1em 0.5em
    }

    input[type='range'] {
      border: 0;
      margin: 0.6em 0 0 0
    }

    select {
      padding: 0.641em 0.5em
    }

    select:-moz-focusring {
      color: transparent;
      text-shadow: 0 0 0 #000;
      transition: none
    }
  }

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    select {
      padding: 0.65em 0.5em;
      padding-right: 0.5em
    }

    input[type='file']::-ms-value {
      background: #FFF
    }

    input[type='file']::-ms-value,input[type='file']::-ms-value {
      box-shadow: none;
      border: 0
    }

    input[type='range'] {
      border-color: transparent
    }
  }

  table {
    width: 100%;
    margin: 1em 0;
    border-spacing: 0;
    border-collapse: separate
  }

  th {
    font-weight: 400;
    color: #000;
    text-align: left
  }

  td {
    border-top: 1px solid #EEE
  }

  td,th {
    padding: 0.5em;
    text-align: left;
    vertical-align: top
  }

  tfoot tr {
    border-bottom: 0
  }

  @media screen and (max-width: 667px) {
    tr,td,th {
      display:block
    }

    tr {
      padding: 1em 0;
      border-top: 1px solid #EEE
    }

    tr:first-child {
      border-top: 0
    }

    thead {
      display: none
    }

    td {
      clear: both;
      border: none
    }

    td,th {
      padding: 0.25em 0
    }
  }

  .tabs-block {
    background: transparent;
    border-bottom: 1px solid #EEE
  }

  .tabs-block .col {
    text-align: center;
    position: relative
  }

  .tabs-block .col:last-child {
    border-right: 0
  }

  .tabs-block .col:hover,.tabs-block .col.here {
    background: #EEE;
    transition: all 200ms ease-in-out
  }

  .tabs-block a {
    width: 100%;
    display: inline-block;
    padding: 0.5em;
    color: #444
  }

  .tabs {
    display: inline-block;
    list-style: none;
    margin: 1em 0;
    padding: 0;
    width: 100%
  }

  .tabs a {
    border-radius: 0.15em;
    border: 1px solid transparent;
    padding: 0.65em 1em;
    color: #444
  }

  .tabs li {
    display: inline-block;
    padding: 0 0.5%
  }

  .tabs li:hover a,.tabs li.here a {
    transition: all 200ms ease-in-out;
    background: #EEE
  }

  .tabs ul {
    padding: 0
  }

  .tabs.round li a {
    border-radius: 99em
  }

  @media screen and (max-width: 860px) {
    .tabs-block a,.tabs a {
      margin:0.5% 0;
      padding: 0.65em 0.5em;
      display: block;
      text-align: center
    }

    .tabs-block {
      border-bottom: 0
    }

    .tabs li {
      display: block;
      padding: 0
    }
  }

  .load {
    -webkit-animation-duration: 1s;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-name: loading;
    -webkit-animation-timing-function: linear;
    -moz-animation-duration: 1s;
    -moz-animation-iteration-count: infinite;
    -moz-animation-name: loading;
    -moz-animation-timing-function: linear;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-name: loading;
    animation-timing-function: linear;
    border-radius: 99em;
    border: 3px solid #DDD;
    border-left-color: #666;
    display: inline-block;
    height: 2em;
    width: 2em
  }

  .load.smallest {
    width: 9px;
    height: 9px;
    border-width: 1px
  }

  .load.small {
    width: 16px;
    height: 16px;
    border-width: 2px
  }

  .load.large {
    width: 48px;
    height: 48px;
    border-width: 4px
  }

  @keyframes loading {
    from {
      transform: rotate(0deg)
    }

    to {
      transform: rotate(360deg)
    }
  }
</style>