<template>
  <div class="contact" :class="customStyle" :style="customCss">
    <table>
      <tr v-if="content.mail">
        <td>电子邮件</td>
        <td>{{content.mail}}</td>
      </tr>
      <tr v-if="content.phone">
        <td>固定电话</td>
        <td>{{content.phone}}</td>
      </tr>
      <tr v-if="content.mobile">
        <td>移动电话</td>
        <td>{{content.mobile}}</td>
      </tr>
      <tr v-if="content.wx">
        <td>微信公众号</td>
        <td>{{content.wx}}</td>
      </tr>
      <tr v-if="content.qq">
        <td>QQ</td>
        <td>{{content.qq}}</td>
      </tr>
      <tr v-if="content.address">
        <td>地址</td>
        <td>{{content.address}}</td>
      </tr>
    </table>
  </div>
</template>
<script>
  import CR from '../../utils/CRMixin'
  export default{
    name: 'contact',
    mixins: [CR],
  }
</script>
<style>
  .contact table {
  }
  .contact table tr td:nth-child(1) {
    text-align: right;
    color: #bcbcbc;
  }
  .contact table tr td:nth-child(2) {
    padding-left: 1em;
  }
</style>
