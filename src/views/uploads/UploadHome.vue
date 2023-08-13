<template>
  <div class="container">
    <el-row :gutter="60" style="height: calc(50% - 30px); margin-bottom: 60px">
      <el-col :span="6">
        <MyImageCard title="支付宝" action-text="上传“支付宝”账单" action-path="/upload/upload-alipay"
                     :background-color-style="{ backgroundColor: 'rgb(0, 159, 232)' }"
                     :image-style="{ backgroundImage: `url(${require('@/assets/alipay.png')})` }"/>
      </el-col>
      <el-col :span="6">
        <MyImageCard title="微信" action-text="上传“微信”账单" action-path="/upload/upload-wechat"
                     :background-color-style="{ backgroundColor: 'rgb(40, 196, 69)' }"
                     :image-style="{ backgroundImage: `url(${require('@/assets/wechat.png')})` }"/>
      </el-col>
    </el-row>
    <el-row :gutter="60" style="height: calc(50% - 30px)">
    </el-row>
  </div>
</template>

<style scoped>
.container {
  height: calc(100vh - 110px);
  padding: calc((100vh - 110px) / 10);
}
</style>

<script setup lang="ts">
import MyImageCard from "@/components/cards/MyImageCard.vue";
</script>