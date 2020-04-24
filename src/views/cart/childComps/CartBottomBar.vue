<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll"
                    class="check-button"
                    @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>
    <div class="totalprice">
      合计:{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton.vue"

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      totalPrice() {
        // let totalPrice = 0;
        // for (let item of this.$store.state.cartList) {
        //   if (item.checked) {
        //     totalPrice += (item.price * item.count)
        //   }
        // }
        // return totalPrice
        return '￥' + this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((prev, item) => {
          return prev +  item.price * item.count
        },0)
      },
      checkLength() {
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        if (this.$store.state.cartList.length !== 0){
        // return !this.$store.state.cartList.filter(item => !item.checked).length
        return !this.$store.state.cartList.find(item => !item.checked)
        } else {
          return false
        }

        // for (let item of this.$store.state.cartList) {
        //   if (!item.checked) {
        //     return false
        //   }
        // }
        // return true
      }
    },
    methods: {
      checkClick() {
        if (this.isSelectAll) { //全部选中
          this.$store.state.cartList.forEach(item => item.checked = false)
        } else {
          this.$store.state.cartList.forEach(item => item.checked = true)
        }
      },
			calcClick() {
				if(this.$store.state.cartList.length == 0) {
					this.$toast.show("请先添加商品")
					} else if (!this.$store.state.cartList.find(item => item.checked)){
					this.$toast.show("请选择要购买的商品")
					}
			}
    }
  }
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    display: flex;
    background-color: #eee;
    line-height: 40px;
    height: 40px;
    font-size: 14px;
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 65px;
  }

  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }

  .totalprice {
    margin-left: 20px;
    flex: 1;
  }

  .calculate {
    width: 94px;
    color: #fff;
    background: #FF4500;
    text-align: center;
   /* position: absolute;
    right: 0; */
  }
</style>
