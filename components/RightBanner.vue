<template>
	<div class="right-banner"  @mouseover='stop' @mouseout='start'>
    <div v-swiper:mySwiper="swiperOption" class="right-swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(banner, index) in banners" :key="index">
          <img :src="banner">
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
	</div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
export default {
  data() {
    return {
      banners: [require('../assets/images/1.jpg'), require('../assets/images/4.jpg'), require('../assets/images/3.jpg')],
      swiperOption: {
        autoplay: {
          delay: 8000
        }, // 自动播放
        spaceBetween: 30, // 滚动切换时的 两分页间隔
        loop: true, // 循环
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }

    }
  },
  methods: {
    stop() {
      this.mySwiper.autoplay.stop()
    },
    start() {
      this.mySwiper.autoplay.start()
    }
  }
}
</script>
<style>
	.right-banner{ width: 300px; height: 250px;margin-bottom: 15px;position: relative;z-index: 1111;}
	.right-banner img{ width: 100%; vertical-align: top;}
	.right-swiper{width: 100%;height: 100%}
  .swiper-pagination-bullet {border:1px solid #fff;}
</style>
