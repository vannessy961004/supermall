<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <TabControl ref="tabControl1" :titles="['流行','新款','精选']" @tabClick="tabClick" class="tab-control" v-show="isTabFixed"></TabControl>
    <scroll class="content" ref="scroll"
            :probe-type="3" :pull-up-load="true"
            @scroll="contentScroll" @pullingUp="loadMore">
      <HomeSwiper :banners="banners" @swiperImageLoad="swiperImageLoad"></HomeSwiper>
      <RecommendView :recommends="recommends"></RecommendView>
      <FeatureView></FeatureView>
      <TabControl ref="tabControl2" :titles="['流行','新款','精选']" @tabClick="tabClick"></TabControl>
      <GoodsList :goods="showGoods"></GoodsList>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper.vue"
  import RecommendView from "./childComps/RecommendView.vue"
  import FeatureView from "./childComps/FeatureView.vue"

  import NavBar from 'components/common/navbar/NavBar.vue'
  import TabControl from "components/content/tabControl/TabControl.vue"
  import GoodsList from "components/content/goods/GoodsList.vue"
  import Scroll from "components/common/scroll/Scroll.vue"
  import BackTop from "components/content/backTop/BackTop.vue"

  import {getHomeMultidata, getHomeGoods} from "network/home.js"
  import {debounce} from "common/utils.js"
  import {itemListenerMixin} from "common/mixin.js"

  export default {
    name:"Home",
    components:{
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    mixins:[itemListenerMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    activated() {
      this.$refs.scroll.refresh()

      this.$refs.scroll.scrollTo(0, this.saveY, 0)

      console.log(this.saveY)
    },
    deactivated() {
      //1.保存Y值
      this.saveY = this.$refs.scroll.getScrollY()

      //2.取消全局事件的监听
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    created() {
      //1.请求多个数据
      this.getHomeMultidata1()

       //2.请求商品数据
      this.getHomeGoods_1('pop')

      this.getHomeGoods_1('new')

      this.getHomeGoods_1('sell')

    },
    mounted() {
    },
    methods: {
      /**
       * 事件监听相关的方法
       */
      tabClick(index){
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },

      backClick() {
        this.$refs.scroll.scrollTo(0,0,1000)
      },

      contentScroll(position) {
        //1.判断BackTop是否显示
        this.isShowBackTop = position.y < -1000 ? true : false

        //2.决定tabControl是否吸顶(position: fixed)
        this.isTabFixed = -position.y > this.tabOffsetTop
      },

      loadMore() {
        this.getHomeGoods_1(this.currentType)
      },

      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },

      /**
       * 网络请求相关的方法
       */
      getHomeMultidata1() {
        getHomeMultidata().then(res => {
          // this.result = res;
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods_1(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
            this.goods[type].list.push(...res.data.list)
            this.goods[type].page += 1

            //完成上拉加载更多
            this.$refs.scroll.finishPullUp()
          })
        },
      }
  }
</script>

<style scoped>
  #home {
    position: relative;
    /* padding-top: 44px; */
  }

  .home-nav {
    background-color: var(--color-tint);
    color: white;
    display: block;

   position: relative;
   z-index: 9;
  }

  .content {
    /* vh:视口高度，100vh是整个视口的高度 */
    height: calc(100vh - 93px);
  }

  .tab-control {
    position: relative;
    z-index: 9;
    left: 0;
    top: 0;
    right: 0;
  }
</style>
