<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="navbar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>

    <!-- 商品的列表 -->
    <scroll class="content" ref="scroll">
      <cart-list></cart-list>
    </scroll>

    <!-- 底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>

  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'
  import CartList from "./childComps/CartList.vue"
  import Scroll from "components/common/scroll/Scroll.vue"
  import CartBottomBar from "./childComps/CartBottomBar.vue"

  import {mapGetters} from "vuex"

  export default {
    name:"Cart",
    components: {
      NavBar,
      CartList,
      Scroll,
      CartBottomBar
    },
    computed: {
      //两种语法
      // ...mapGetters(['cartLength'])
      ...mapGetters({
        length: "cartLength"
      })
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .navbar {
    background-color: var(--color-tint);
    color: #FFFFFF;
  }

  .content {
    height: calc(100vh - 49px - 44px - 40px);
    overflow: hidden;
  }
</style>
