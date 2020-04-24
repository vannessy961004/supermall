<template>
  <div class="detail" id="detail">
    <DetailNavBar class="detail-nav" @titleClick="titleClick" ref="nav"></DetailNavBar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <DetailSwiper :top-images="topImages"></DetailSwiper>
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <DetailGoodsInfo :detail-info="detailInfo" @imageLoad="imageLoad"></DetailGoodsInfo>
      <DetailParamInfo ref="params" :param-info="paramInfo"></DetailParamInfo>
      <DetailCommentInfo ref="comment" :comment-info="commentInfo"></DetailCommentInfo>
      <GoodsList ref="recommend" :goods="recommends"></GoodsList>
    </scroll>
    <DetailBottomBar @addToCart="addToCart"></DetailBottomBar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar.vue"
  import DetailSwiper from "./childComps/DetailSwiper.vue"
  import DetailBaseInfo from "./childComps/DetailBaseInfo.vue"
  import DetailShopInfo from "./childComps/DetailShopInfo.vue"
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue"
  import DetailParamInfo from "./childComps/DetailParamInfo.vue"
  import DetailCommentInfo from "./childComps/DetailCommentInfo.vue"
  import DetailBottomBar from "./childComps/DetailBottomBar.vue"

  import Scroll from "components/common/scroll/Scroll.vue"
  import GoodsList from "components/content/goods/GoodsList.vue"


  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/Detail.js"
  import {debounce} from "common/utils.js"
  import {itemListenerMixin, backTopMixin} from "common/mixin.js"

  import { mapActions } from "vuex"

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
    },
    mixins:[itemListenerMixin, backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0,
      }
    },

    created() {
      //1.保存传入的iid
      this.iid = this.$route.params.iid

      //2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        console.log(res)
        const data = res.result
        //1.获取顶部的图片轮播数据
        this.topImages = res.result.itemInfo.topImages

        //2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        //3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        //4.保存商品的详情数据
        this.detailInfo = data.detailInfo;

        //5.获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        //6.取出评论的信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      })

      //3.请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })

      this.getThemeTopY = debounce(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE);

        console.log(this.themeTopYs)
      },50)
    },
    methods: {
      ...mapActions(['addCart']),
      imageLoad() {
        this.$refs.scroll.refresh()

        this.getThemeTopY()
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500)
      },
      contentScroll(position) {
        //1.获取Y值
        const positionY = -position.y

        //2.positionY和themeTopYs对比
        let length = this.themeTopYs.length;
        //(1)没加上最大值之前
       /* for(let i = 0; i < length; i++) {
          if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) ||
            (i === length - 1 && positionY >= this.themeTopYs[i]))) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
          }
        } */

        //(2)加上最大值后

        for(let i = 0; i < length - 1; i++) {
          if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }

        //3.是否显示回到顶部
        this.isShowBackTop = position.y < -1000 ? true : false
      },
      addToCart() {
        //1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        //2.将商品添加到购物车
        // this.$store.commit("addCart", product)
        this.$store.dispatch("addCart", product).then(res => {
          this.$toast.show(res)
        })

        // this.addCart(product).then(res => {
        //   console.log(res)
        // })
      },
    },
    mounted() {
    },
    destroyed() {
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 11;
    background-color: #fff;
    height: 100vh;
  }

  .content {
    position: relative;
    height: calc(100% - 93px);
  }

  .detail-nav {
    position: relative;
    z-index: 11;
    background-color: #fff;
  }
</style>
