<template>
    <div class="qr-code">
        <div :id="id" class="fig">
        </div>
        <div :id="id+'-qr-tips'" class="tips">
            {{content.title}}
        </div>
    </div>
</template>
<script>
  import CR from '../../utils/CRMixin'
  export default{
    name: 'qrcode',
    mixins: [CR],
    data() {
      return {
        id: 'qrcode-' + Math.random().toString(), //this.content.id,
        qr: null
      }
    },
    mounted(){
      this.$data.qr = new QRCode(
        document.getElementById(this.id),
        {
          useSVG: true,
          text: this.content.payload,
          width: this.content.size || 128,
          height: this.content.size || 128,
          colorDark: this.content.dark || "#000",
          colorLight: this.content.light || '#fff',
          correctLevel: QRCode.CorrectLevel.H,
        })
    }
  }
</script>
<style>
    .qr-code {
        display: flex !important;
        position: relative;
        flex-flow: column nowrap;
        align-items: center;
    }
    .qr-code .tips {
        margin-top: 1em;
        color: transparent;
        transition: color 0.5s ease;
    }
    .qr-code:hover .tips{
        color: #fdf6e3;
    }


</style>