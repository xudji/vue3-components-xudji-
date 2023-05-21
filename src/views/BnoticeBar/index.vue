<template>
  <div class="notice-bar-container layout-pd">
    <el-card shadow="hover" header="滚动通知栏：默认">
      <NoticeBar :text="state.text" />
    </el-card>

    <el-card shadow="hover" header="滚动通知栏：设置样式" class="mt15">
      <NoticeBar
        :text="state.text"
        background="#ecf5ff"
        color="#409eff"
        leftIcon
        rightIcon
      >
        <template v-slot:leftIcon>
          <Bell />
        </template>
        <template v-slot:rightIcon>
          <ArrowRight />
        </template>
      </NoticeBar>
    </el-card>

    <el-card
      shadow="hover"
      header="滚动通知栏：搭配 NoticeBar 和 Carousel 走马灯 组件可以实现垂直滚动的效果"
      class="mt15"
    >
      <NoticeBar :scrollable="true">
        <el-carousel
          height="40px"
          direction="vertical"
          :autoplay="true"
          indicator-position="none"
          :interval="3000"
        >
          <el-carousel-item v-for="v in state.noticeList" :key="v"
            >{{ v }}
          </el-carousel-item>
        </el-carousel>
      </NoticeBar>
    </el-card>
  </div>
</template>

<script setup lang="ts" name="makeNoticeBar">
import { defineAsyncComponent, reactive } from "vue";

// 引入组件
const NoticeBar = defineAsyncComponent(
  () => import("@/components/BnoticeBar/index.vue")
);

// 定义变量内容
const state = reactive({
  text: "🎉🎉🔥【欢迎使用】尊敬的用户，感谢您选择我们的系统，如有任何问题或建议，请及时联系我们，我们将竭诚为您服务。",
  noticeList: [
    "🎉🎉🔥基于vue3.x 、Typescript、vite、Element plus等",
    "【欢迎使用】尊敬的用户，感谢您选择我们的系统，如有任何问题或建议，请及时联系我们，我们将竭诚为您服务。",
    "【欢迎使用】尊敬的用户，感谢您选择我们的系统，如有任何问题或建议，请及时联系我们，我们将竭诚为您服务。",
  ],
});
</script>
