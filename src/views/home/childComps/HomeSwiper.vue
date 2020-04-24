<template>
  <div>
     <div class="swiper-container">
       <div class="swiper-wrapper" >
         <div class="swiper-slide" v-for="(item, i) in banners" :key='i'>
           <a :href="item.link">
             <img :src="item.image" alt="" @load="imageLoad">
           </a>
         </div>
       </div>
       <div class="swiper-pagination"></div>
       <div class="swiper-button-prev"></div>
       <div class="swiper-button-next"></div>
    </div>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.css'

  export default {
    name: "HomeSwiper",
    components:{
      Swiper
    },
    data() {
      return {
        isLoad: false
      }
    },
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    updated() {
        new Swiper('.swiper-container',{
           loop: true,
           autoplay:{
             delay:2000,
             disableOnInteraction:false, //解决滑动后不能轮播的问题
           },
           pagination: {
             el: '.swiper-pagination',
             type: 'bullets',
             clickable :true,
           },
           navigation: {
             nextEl: '.swiper-button-next',
             prevEl: '.swiper-button-prev',
           },
           observer:true,//修改swiper自己或子元素时，自动初始化swiper
           observeParents:true//修改swiper的父元素时，自动初始化swiper
         })
      },
    methods: {
      imageLoad() {
        if (!this.isLoad) {
          this.$emit("swiperImageLoad")
          this.isLoad = true
        }
      }
    }
 }
</script>

<style scoped>
 .swiper-container {
    width: 100%;
    margin: 0;
    padding: 0;
  }

  .swiper-wrapper {
    height: 200px;
  }

  .swiper-slide img {
    max-width: 100%;
  }

  .swiper-slide {
    text-align: center;
    background: #fff;
    display: flex;
  }
</style>
