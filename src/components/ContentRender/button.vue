<template>
  <a class="button" :class="customStyle" :style="customCss" :href="content.link">{{content.text}}</a>
</template>
<script>
  import CR from '../../utils/CRMixin'
  export default{
    name: 'button',
    mixins: [CR],
  }
</script>
<style>
  .button {
    display: flex;
    flex: 0 0 auto;
    justify-content: center;
    align-items: center;
    align-self: center;
    flex-flow: row nowrap;

    height: auto;
    line-height: 1;

    text-decoration: none;
    user-select: none;
    white-space: nowrap;

    background: transparent;
    border-radius: 0.15em;
    border: 1px solid #666;
    box-shadow: none;
    color: #666;
    cursor: pointer;
    outline: none;

    margin: 0;
    padding: 0.76em 1.5em;
    font-size: 1.05em;
  }

  .button:hover {
    border-color: #666
  }

  .button.solid,.button:hover {
    color: #FFF;
    background: #666
  }

  .button.white {
    color: #FFF;
    border-color: #FFF
  }

  .button.white.solid,.button.white:hover {
    color: #000;
    background: #FFF
  }

  .button.gray-light {
    color: #BBB;
    border-color: #BBB
  }

  .button.gray-light.solid,.button.gray-light:hover {
    color: #666;
    background: #BBB
  }

  .button.gray-dark {
    color: #333;
    border-color: #333
  }

  .button.gray-dark.solid,.button.gray-dark:hover {
    color: #FFF;
    background: #333
  }

  .button.black {
    color: #000;
    border-color: #000
  }

  .button.black.solid,.button.black:hover {
    color: #FFF;
    background: #000
  }

  .button.red {
    color: #C9282E;
    border-color: #C9282E
  }

  .button.red.solid,.button.red:hover {
    color: #FFF;
    background: #C9282E
  }

  .button.orange {
    color: #E16E00;
    border-color: #E16E00
  }

  .button.orange.solid,.button.orange:hover {
    color: #FFF;
    background: #E16E00
  }

  .button.yellow {
    color: #D5B778;
    border-color: #D5B778
  }

  .button.yellow.solid,.button.yellow:hover {
    color: #FFF;
    background: #D5B778
  }

  .button.blue {
    color: #5A9FC8;
    border-color: #5A9FC8
  }

  .button.blue.solid,.button.blue:hover {
    color: #FFF;
    background: #5A9FC8
  }

  .button.green {
    color: #6BAF56;
    border-color: #6BAF56
  }

  .button.green.solid,.button.green:hover {
    color: #FFF;
    background: #6BAF56
  }

  .button.solid:hover,.button.solid:active {
    opacity: 0.8
  }
  .button.no-outline {
    border-color: transparent
  }

  .button.large {
    font-size: 1.2em;
    padding: 0.8em 1.7em;
    word-wrap: normal
  }

  .button.small {
    padding: 0.5em 0.9em;
    font-size: 0.9em
  }

  .button.tiny {
    padding: 0.3em 0.8em;
    font-size: 0.8em
  }

  .button.round {
    border-radius: 99em
  }
  .button:hover {
    transition: all 200ms ease-in-out;
    opacity: 0.8
  }

  .button:disabled,.btn.disabled,.btn:disabled:hover,.btn.disabled:hover {
    cursor: default;
    background: transparent;
    color: #666;
    opacity: 0.2
  }
  @-moz-document url-prefix() {
    .button {
      padding: 0.78em 1.5em
    }
  }
</style>
