<template>
  <div id="footer" :style="{height:footerHeight+'px',background:bgColor}"></div>
</template>

<script>

export default {
  data() {
    return {
      bgColor:'#4e4e4e'
    };
  },
  created(){
    this.footerHeight = this.$store.state.footerHeight;
  },
  mounted(){
    this.$store.commit("setFooterHeight", document.getElementById("footer").offsetHeight);
  }
  
};
</script>

<style lang="scss">

</style>
