<template>
    <div v-html="md" class="markdown" :class="customStyle" :style="customCss">
    </div>
</template>
<script>
  import marked from 'marked'
  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: true
  })

  import CR from '../../utils/CRMixin'
  export default{
    name: 'markdown',
    mixins: [CR],
    computed: {
      md() {
        if (this.content && this.content.payload) {
          if (typeof this.content.payload === 'string') {
            return marked(this.content.payload)
          } else {
            return '<em style="color: red">markdown: not a string!</em>'
          }
        }
      },
    },
  }
</script>
<style>
    .markdown {
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-around;
        box-sizing: border-box;
        min-width: 200px;
        margin: 0 auto;
        padding: 1em;
    }

    .markdown {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        line-height: 1.5;
        color: #333;
        font-size: 16px;
        line-height: 1.5;
        word-wrap: break-word;
    }

    .markdown .pl-c {
        color: #969896;
    }

    .markdown .pl-c1,
    .markdown .pl-s .pl-v {
        color: #0086b3;
    }

    .markdown .pl-e,
    .markdown .pl-en {
        color: #795da3;
    }

    .markdown .pl-smi,
    .markdown .pl-s .pl-s1 {
        color: #333;
    }

    .markdown .pl-ent {
        color: #63a35c;
    }

    .markdown .pl-k {
        color: #a71d5d;
    }

    .markdown .pl-s,
    .markdown .pl-pds,
    .markdown .pl-s .pl-pse .pl-s1,
    .markdown .pl-sr,
    .markdown .pl-sr .pl-cce,
    .markdown .pl-sr .pl-sre,
    .markdown .pl-sr .pl-sra {
        color: #183691;
    }

    .markdown .pl-v {
        color: #ed6a43;
    }

    .markdown .pl-id {
        color: #b52a1d;
    }

    .markdown .pl-ii {
        color: #f8f8f8;
        background-color: #b52a1d;
    }

    .markdown .pl-sr .pl-cce {
        font-weight: bold;
        color: #63a35c;
    }

    .markdown .pl-ml {
        color: #693a17;
    }

    .markdown .pl-mh,
    .markdown .pl-mh .pl-en,
    .markdown .pl-ms {
        font-weight: bold;
        color: #1d3e81;
    }

    .markdown .pl-mq {
        color: #008080;
    }

    .markdown .pl-mi {
        font-style: italic;
        color: #333;
    }

    .markdown .pl-mb {
        font-weight: bold;
        color: #333;
    }

    .markdown .pl-md {
        color: #bd2c00;
        background-color: #ffecec;
    }

    .markdown .pl-mi1 {
        color: #55a532;
        background-color: #eaffea;
    }

    .markdown .pl-mdr {
        font-weight: bold;
        color: #795da3;
    }

    .markdown .pl-mo {
        color: #1d3e81;
    }

    .markdown .octicon {
        display: inline-block;
        vertical-align: text-top;
        fill: currentColor;
    }

    .markdown a {
        background-color: transparent;
        -webkit-text-decoration-skip: objects;
    }

    .markdown a:active,
    .markdown a:hover {
        outline-width: 0;
    }

    .markdown strong {
        font-weight: bolder;
    }

    .markdown img {
        border-style: none;
    }

    .markdown svg:not(:root) {
        overflow: hidden;
    }

    .markdown code,
    .markdown kbd,
    .markdown pre {
        font-family: monospace, monospace;
        font-size: 1em;
    }

    .markdown hr {
        box-sizing: content-box;
        height: 0;
        overflow: visible;
    }

    .markdown input {
        font: inherit;
        margin: 0;
    }

    .markdown input {
        overflow: visible;
    }

    .markdown [type="checkbox"] {
        box-sizing: border-box;
        padding: 0;
    }

    .markdown * {
        box-sizing: border-box;
    }

    .markdown input {
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
    }

    .markdown a {
        color: #4078c0;
        text-decoration: none;
    }

    .markdown a:hover,
    .markdown a:active {
        text-decoration: underline;
    }

    .markdown strong {
        font-weight: 600;
    }

    .markdown hr {
        height: 0;
        margin: 15px 0;
        overflow: hidden;
        background: transparent;
        border: 0;
        border-bottom: 1px solid #ddd;
    }

    .markdown hr::before {
        display: table;
        content: "";
    }

    .markdown hr::after {
        display: table;
        clear: both;
        content: "";
    }

    .markdown table {
        border-spacing: 0;
        border-collapse: collapse;
    }

    .markdown td,
    .markdown th {
        padding: 0;
    }

    .markdown p {
        margin-top: 0;
        margin-bottom: 10px;
    }

    .markdown blockquote {
        margin: 0;
    }

    .markdown ul,
    .markdown ol {
        padding-left: 0;
        margin-top: 0;
        margin-bottom: 0;
    }

    .markdown ol ol,
    .markdown ul ol {
        list-style-type: lower-roman;
    }

    .markdown ul ul ol,
    .markdown ul ol ol,
    .markdown ol ul ol,
    .markdown ol ol ol {
        list-style-type: lower-alpha;
    }

    .markdown dd {
        margin-left: 0;
    }

    .markdown code {
        font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace;
        font-size: 12px;
    }

    .markdown pre {
        margin-top: 0;
        margin-bottom: 0;
        font: 12px Consolas, "Liberation Mono", Menlo, Courier, monospace;
    }

    .markdown .octicon {
        vertical-align: text-bottom;
    }

    .markdown input {
        -webkit-font-feature-settings: "liga" 0;
        font-feature-settings: "liga" 0;
    }

    .markdown::before {
        display: table;
        content: "";
    }

    .markdown::after {
        display: table;
        clear: both;
        content: "";
    }

    .markdown>*:first-child {
        margin-top: 0 !important;
    }

    .markdown>*:last-child {
        margin-bottom: 0 !important;
    }

    .markdown a:not([href]) {
        color: inherit;
        text-decoration: none;
    }

    .markdown .anchor {
        float: left;
        padding-right: 4px;
        margin-left: -20px;
        line-height: 1;
    }

    .markdown .anchor:focus {
        outline: none;
    }

    .markdown p,
    .markdown blockquote,
    .markdown ul,
    .markdown ol,
    .markdown dl,
    .markdown table,
    .markdown pre {
        margin-top: 0;
        margin-bottom: 16px;
    }

    .markdown hr {
        height: 0.25em;
        padding: 0;
        margin: 24px 0;
        background-color: #e7e7e7;
        border: 0;
    }

    .markdown blockquote {
        padding: 0 1em;
        color: #777;
        border-left: 0.25em solid #ddd;
    }

    .markdown blockquote>:first-child {
        margin-top: 0;
    }

    .markdown blockquote>:last-child {
        margin-bottom: 0;
    }

    .markdown kbd {
        display: inline-block;
        padding: 3px 5px;
        font-size: 11px;
        line-height: 10px;
        color: #555;
        vertical-align: middle;
        background-color: #fcfcfc;
        border: solid 1px #ccc;
        border-bottom-color: #bbb;
        border-radius: 3px;
        box-shadow: inset 0 -1px 0 #bbb;
    }

    .markdown h1,
    .markdown h2,
    .markdown h3,
    .markdown h4,
    .markdown h5,
    .markdown h6 {
        margin-top: 24px;
        margin-bottom: 16px;
        font-weight: 600;
        line-height: 1.25;
    }

    .markdown h1 .octicon-link,
    .markdown h2 .octicon-link,
    .markdown h3 .octicon-link,
    .markdown h4 .octicon-link,
    .markdown h5 .octicon-link,
    .markdown h6 .octicon-link {
        color: #000;
        vertical-align: middle;
        visibility: hidden;
    }

    .markdown h1:hover .anchor,
    .markdown h2:hover .anchor,
    .markdown h3:hover .anchor,
    .markdown h4:hover .anchor,
    .markdown h5:hover .anchor,
    .markdown h6:hover .anchor {
        text-decoration: none;
    }

    .markdown h1:hover .anchor .octicon-link,
    .markdown h2:hover .anchor .octicon-link,
    .markdown h3:hover .anchor .octicon-link,
    .markdown h4:hover .anchor .octicon-link,
    .markdown h5:hover .anchor .octicon-link,
    .markdown h6:hover .anchor .octicon-link {
        visibility: visible;
    }

    .markdown h1 {
        padding-bottom: 0.3em;
        font-size: 2em;
        border-bottom: 1px solid #eee;
    }

    .markdown h2 {
        padding-bottom: 0.3em;
        font-size: 1.5em;
        border-bottom: 1px solid #eee;
    }

    .markdown h3 {
        font-size: 1.25em;
    }

    .markdown h4 {
        font-size: 1em;
    }

    .markdown h5 {
        font-size: 0.875em;
    }

    .markdown h6 {
        font-size: 0.85em;
        color: #777;
    }

    .markdown ul,
    .markdown ol {
        padding-left: 2em;
    }

    .markdown ul ul,
    .markdown ul ol,
    .markdown ol ol,
    .markdown ol ul {
        margin-top: 0;
        margin-bottom: 0;
    }

    .markdown li>p {
        margin-top: 16px;
    }

    .markdown li+li {
        margin-top: 0.25em;
    }

    .markdown dl {
        padding: 0;
    }

    .markdown dl dt {
        padding: 0;
        margin-top: 16px;
        font-size: 1em;
        font-style: italic;
        font-weight: bold;
    }

    .markdown dl dd {
        padding: 0 16px;
        margin-bottom: 16px;
    }

    .markdown table {
        display: block;
        width: 100%;
        overflow: auto;
    }

    .markdown table th {
        font-weight: bold;
    }

    .markdown table th,
    .markdown table td {
        padding: 6px 13px;
        border: 1px solid #ddd;
    }

    .markdown table tr {
        background-color: #fff;
        border-top: 1px solid #ccc;
    }

    .markdown table tr:nth-child(2n) {
        background-color: #f8f8f8;
    }

    .markdown img {
        max-width: 100%;
        box-sizing: content-box;
        background-color: #fff;
    }

    .markdown code {
        padding: 0;
        padding-top: 0.2em;
        padding-bottom: 0.2em;
        margin: 0;
        font-size: 85%;
        background-color: rgba(0,0,0,0.04);
        border-radius: 3px;
    }

    .markdown code::before,
    .markdown code::after {
        letter-spacing: -0.2em;
        content: "\00a0";
    }

    .markdown pre {
        word-wrap: normal;
    }

    .markdown pre>code {
        padding: 0;
        margin: 0;
        font-size: 100%;
        word-break: normal;
        white-space: pre;
        background: transparent;
        border: 0;
    }

    .markdown .highlight {
        margin-bottom: 16px;
    }

    .markdown .highlight pre {
        margin-bottom: 0;
        word-break: normal;
    }

    .markdown .highlight pre,
    .markdown pre {
        padding: 16px;
        overflow: auto;
        font-size: 85%;
        line-height: 1.45;
        background-color: #f7f7f7;
        border-radius: 3px;
    }

    .markdown pre code {
        display: inline;
        max-width: auto;
        padding: 0;
        margin: 0;
        overflow: visible;
        line-height: inherit;
        word-wrap: normal;
        background-color: transparent;
        border: 0;
    }

    .markdown pre code::before,
    .markdown pre code::after {
        content: normal;
    }

    .markdown .pl-0 {
        padding-left: 0 !important;
    }

    .markdown .pl-1 {
        padding-left: 3px !important;
    }

    .markdown .pl-2 {
        padding-left: 6px !important;
    }

    .markdown .pl-3 {
        padding-left: 12px !important;
    }

    .markdown .pl-4 {
        padding-left: 24px !important;
    }

    .markdown .pl-5 {
        padding-left: 36px !important;
    }

    .markdown .pl-6 {
        padding-left: 48px !important;
    }

    .markdown .full-commit .btn-outline:not(:disabled):hover {
        color: #4078c0;
        border: 1px solid #4078c0;
    }

    .markdown kbd {
        display: inline-block;
        padding: 3px 5px;
        font: 11px Consolas, "Liberation Mono", Menlo, Courier, monospace;
        line-height: 10px;
        color: #555;
        vertical-align: middle;
        background-color: #fcfcfc;
        border: solid 1px #ccc;
        border-bottom-color: #bbb;
        border-radius: 3px;
        box-shadow: inset 0 -1px 0 #bbb;
    }

    .markdown :checked+.radio-label {
        position: relative;
        z-index: 1;
        border-color: #4078c0;
    }

    .markdown .task-list-item {
        list-style-type: none;
    }

    .markdown .task-list-item+.task-list-item {
        margin-top: 3px;
    }

    .markdown .task-list-item input {
        margin: 0 0.2em 0.25em -1.6em;
        vertical-align: middle;
    }

    .markdown hr {
        border-bottom-color: #eee;
    }
</style>

