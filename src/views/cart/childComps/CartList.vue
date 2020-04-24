<template>
  <div class="cart-list">
    <cart-list-item v-for="(item, index) in cartlist" :product="item" :key="index" class="item"></cart-list-item>
  </div>
</template>

<script>
  import CartListItem from "./CartListItem.vue"


  import {mapGetters} from "vuex"

  export default {
    name: "CartList",
    components: {
      CartListItem,
    },
    computed: {
      ...mapGetters(['cartlist'])
    },
  }
</script>

<style scoped>
</style>
