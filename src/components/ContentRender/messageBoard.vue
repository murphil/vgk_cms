<template>
  <div class="messageBoard"
       :class="customStyle"
       :style="customCss">
    <h1>{{content.title}}</h1>
    <div class="body">
      <div>
        <label>
          <input name="name" placeholder="姓名"
                 v-model="name">
        </label>
        <label>
          <input placeholder="联系电话"
                 v-model="phone">
        </label>
      </div>
      <div>
        <label>
          <input placeholder="邮箱" type="email"
                 v-model="mail">
        </label>
      </div>
      <div>
        <label>
          <textarea name="name" placeholder="内容" rows="4"
                    v-model="msg"></textarea>
        </label>
      </div>
      <label>
        <input  @click="commit"
                class="btn" type="submit" value="提交">
      </label>
    </div>
  </div>
</template>
<script>
  import CR from '../../utils/CRMixin'
  import {mapActions} from 'vuex'
  export default{
    name: 'messageBoard',
    mixins: [CR],
    data() {
      return {
        name: '',
        phone: '',
        mail: '',
        msg: ''
      }
    },
    methods: {
      ...mapActions(['externalMessage']),
      async commit() {
        await this.externalMessage({
          name: this.name,
          mail: this.mail,
          phone: this.phone,
          msg: this.msg
        })
      }
    },
  }
</script>
<style>
  .messageBoard {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    flex: 1 1 auto;
    font-size: 12px;
    padding: 1em 10em 1em 10em;
  }

  .messageBoard > .body {
    width: 100%;
  }
  .messageBoard > .body > div {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    width: 100%;
  }
  .messageBoard > .body  label {
    flex: 1 1 auto;
  }

  .messageBoard > .body input, .messageBoard > .body textarea {
    flex: 1 1 100%;
    width: 100%;
    box-sizing: border-box;
  }


</style>
