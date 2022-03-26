<template>
  <div class="article-list">
    <van-pull-refresh
     v-model="isreFreshLoading"
     @refresh="onRefresh"
     :success-text="reFreshLoadingText"
     :success-duration="1500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <!-- <van-cell v-for="(item, index) in list" :key="index" :title="item.title" /> -->
        <ArticleItem
         v-for="(item, index) in list"
         :key="index"
         :article="item"
        >

        </ArticleItem>
      </van-list>
    </van-pull-refresh>

  </div>
</template>

<script>
import { getArticlesAPI } from '@/api'
import ArticleItem from '@/components/article-item.vue'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中 loading 状态 为true时显示加载中 为false不显示
      finished: false, // 控制数据加载结束的状态， 为true时将继续显示数据，显示没有更多了
      timestamp: null, // 请求获取下一页的时间戳 由上一次获取的数据
      error: false, // 控制列表加载失败的提示状态
      isreFreshLoading: false, // 控制下拉刷新的loading状态
      reFreshLoadingText: '刷新成功'
    }
  },
  methods: {
    // 初始化或滚动到底部的时候会触发调用 onLoad
    /* onLoad() {
      // 异步更新数据
      // 1. 请求获取数据
      setTimeout(() => {
        // 2. 把请求结果数据放到 list数组中
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 3. 本次数据加载结束之后要把加载状态设置为结束
        //    因为 loading 关闭以后才能触发
        this.loading = false;

        // 4. 判断数据是否全部加载完成
        if (this.list.length >= 40) {
          // 如果没有数据了，把finished 设置为 true
          // 显示 没有更多了
          this.finished = true;
        }
      }, 1000);
    }, */
    async onLoad () {
      // 异步更新数据
      try {
        // 1. 请求获取数据
        // console.log(Date.now());
        const { data: { data } } = await getArticlesAPI({
          channel_id: this.channel.id, // 频道id
          timestamp: this.timestamp || Date.now() // 当前时间戳
        })
        // 模拟随机失败的小技巧
        /* if(Math.random() > 0.5){
          JSON.parse('adadsdssssccsdads')
        } */
        // console.log(data);
        const { results } = data
        // 2. 把请求结果数据放到 list数组中
        this.list.push(...data.results)
        // 3. 本次数据加载结束之后要把加载状态设置为结束
        //    因为 loading 关闭以后才能触发
        this.loading = false
        // 4. 判断数据是否全部加载完成
        if (results.length) {
          // 如果results还有数据就更新获取下一页的时间戳
          // 通过下一页的时间戳来获取下一页的数据
          this.timestamp = data.pre_timestamp
        } else {
          // 如果数据为空 则finished为ture
          this.finished = true
        }
      } catch (err) {
        // console.log('请求失败', err);
        this.error = true
        this.loading = false
      }
    },
    async onRefresh () {
      try {
        // 请求获取数据
        const { data: { data } } = await getArticlesAPI({
          channel_id: this.channel.id, // 频道id
          timestamp: Date.now() // 下拉刷新每次获取最新数据，所以要最新时间戳
        })
        // 模拟随机失败的小技巧
        /* if(Math.random() > 0.5){
          JSON.parse('adadsdssssccsdads')
        } */
        // 将数据追加到列表的顶部
        const { results } = data
        // console.log(results);
        this.list.unshift(...results)
        // 关闭下拉刷新的loading 状态
        this.isreFreshLoading = false
        this.reFreshLoadingText = `刷新成功，更新了${results.length}条数据`
      } catch (err) {
        // console.log();
        this.isreFreshLoading = false
        this.reFreshLoadingText = '刷新失败'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article-list{
  // 百分比是相对于父元素的
  // height: 100%;
  height: 79vh;
  overflow-y: auto;
}
</style>
