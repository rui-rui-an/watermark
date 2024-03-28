<template>
  <div class="home">
    <el-button type="primary">element的按钮</el-button>
    <div class="course_video_box" >
      <!-- 水印 -->
      <div class="my_course_video_box" v-watermark="{ text: 'lr123', textColor: 'red' }">
      </div>
      <video :id="'player1'" class="course_video" ref="my_videos" preload="auto" playsinline webkit-playsinline></video>
    </div>


    <!-- 其他/番外 -->
    <div class="fanwai"  v-watermark="{ text: '番外/其他', textColor: 'red' }">

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TCPlayer from 'tcplayer.js';
import 'tcplayer.js/dist/tcplayer.min.css';

export default {
  name: 'HomeView',
  data() {
    return {
    }
  },
  created() {
    // console.log(this.username);
    // console.log(this.$store.state.user.username);
    // this.setName('李四');
    // this.generateRoutes();
    // this.$store.dispatch('permission/generateRoutes');
  },
  mounted() {
    this.setVideo()
  },
  methods: {
    setVideo() {
      this.player = TCPlayer("player1", {
        sources: [
          {
            src: 'https://1500005692.vod2.myqcloud.com/43843706vodtranscq1500005692/62656d94387702300542496289/v.f100240.m3u8',
          },
        ],
        licenseUrl:
          "https://license.vod2.myqcloud.com/license/v2/1323277369_1/v_cube.license",
        licenseKey: "10d1a28c0b51babf7143d9ebff16fc0f",
        // plugins: {
        //   DynamicWatermark: {
        //     type: 'text',
        //     content: this.userDetail.name,
        //     speed: 0.5,
        //     fontSize: '14px'
        //   }
        // }
      }); // player-container-id 为播放器容器 ID，必须与 html 中一致
      // 
      // this.player.src(url); // url 播放地址

      // 用户全屏添加水印
      this.player.on('fullscreenchange', () => {
        const video_div = document.getElementsByClassName('course_video')[0]
        video_div.appendChild(document.getElementsByClassName('my_course_video_box')[0])
      })
    },
  },
  components: {
  }
};
</script>
<style lang="less" scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .course_video_box {
    width: 800px;
    height: 600px;
    position: relative;

    .my_course_video_box {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      pointer-events: none;
    }
    .course_video {
      width: 100%;
      height: 100%;
    }
  }
  .fanwai{
    width: 800px;
    height: 150px;
    border: 1px solid rebeccapurple;
    margin-top: 20px;
    position: relative;
  }
}
</style>
