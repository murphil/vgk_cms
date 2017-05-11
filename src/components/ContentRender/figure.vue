<template>
  <div class="figure" :style="customCss" :class="customStyle">
    <img :src="img" class="image" />
    <div v-html="md" class="markdown"></div>
  </div>
</template>
<script>
  import marked from 'marked'

  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: false,
    tables: false,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: true
  })

  import CR from '../../utils/CRMixin'
  export default{
    name: 'figure',
    mixins: [CR],
    computed: {
      img() {
        return this.content.img
      },
      md() {
        if (this.content && this.content.md) {
          if (typeof this.content.md === 'string') {
            return marked(this.content.md)
          } else {
            return '<em style="color: red">markdown: not a string!</em>'
          }
        }
      },
    }
  }
</script>
<style>
  .figure {
    display: flex;
    flex: 1 1 10%;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    margin: 1em;
    font-size: 12px;
    color: #657b83;
  }

  .figure .markdown {
    display: flex;
    flex: 0 0 auto;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
  }

  .figure .markdown a {
    color: #4078c0;
    text-decoration: none;
    background-color: transparent;
  }
  .figure .markdown a:active,
  .figure .markdown a:hover {
    outline-width: 0;
    text-decoration: underline;
  }
  .figure .markdown strong {
    font-weight: 600;
  }
  .figure .markdown hr {
    height: 0;
    margin: 15px 0;
    overflow: hidden;
    background: transparent;
    border: 0;
    border-bottom: 1px solid #ddd;
  }
  .figure .markdown hr::before {
    display: table;
    content: "";
  }
  .figure .markdown hr::after {
    display: table;
    clear: both;
    content: "";
  }
  .figure .markdown h1,
  .figure .markdown h2,
  .figure .markdown h3,
  .figure .markdown h4,
  .figure .markdown h5,
  .figure .markdown h6 {
    margin-top: 24px;
    margin-bottom: 16px;
    font-weight: 600;
    line-height: 1.25;
  }

  .figure .markdown h1:hover .anchor,
  .figure .markdown h2:hover .anchor,
  .figure .markdown h3:hover .anchor,
  .figure .markdown h4:hover .anchor,
  .figure .markdown h5:hover .anchor,
  .figure .markdown h6:hover .anchor {
    text-decoration: none;
  }

  .figure .markdown h1 { font-size: 4em}
  .figure .markdown h2 { font-size: 3em}
  .figure .markdown h3 { font-size: 2.5em}
  .figure .markdown h4 { font-size: 2em}
  .figure .markdown h5 { font-size: 1.7em}
  .figure .markdown h6 { font-size: 1.6em; color: #777 }

  .figure .markdown pre {
    margin-top: 0;
    margin-bottom: 0;
    font: 6em Consolas, "Liberation Mono", Menlo, Courier, monospace;
  }

</style>
