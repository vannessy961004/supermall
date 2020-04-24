<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in topImages">
        <img :src="item" alt="">
      </div>
    </div>
    <div class="swiper-pagination"></div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.css'

  export default {
    name: "DetailSwiper",
    components:{
      Swiper
    },
    props:{
      topImages: {
        type:Array,
        default() {
          return []
        }
      }
    },
    updated() {
      if(this.topImages.length > 1){
        new Swiper('.swiper-container',{
          loop:true,
          autoplay: {
            delay:2000,
            disableOnInteraction:false
          },
          pagination: {
            el: ".swiper-pagination",
            type: "bullets",
            clickable :true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          observer:true,//修改swiper自己或子元素时，自动初始化swiper
          observeParents:true//修改swiper的父元素时，自动初始化swiper
        })
      }else{
        new Swiper('.swiper-container',{
          loop:false,
          autoplay: false,
          pagination: {
            el: ".swiper-pagination",
            type: "bullets",
            clickable :true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          observer:true,//修改swiper自己或子元素时，自动初始化swiper
          observeParents:true//修改swiper的父元素时，自动初始化swiper
        })
      }
    }
  }
</script>

<style scoped>
  .swiper-container {
      width: 100%;
      height: 300px;
      margin: 0;
      padding: 0;
    }
  .swiper-slide {
    text-align: center;
    display: flex;
  }

  .swiper-slide img {
    width: 100%;
    height: 150%;
  }
</style>
