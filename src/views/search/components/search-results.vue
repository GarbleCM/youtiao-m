<template>
  <div class="search-results">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
        <van-cell v-for="(item,index) in searchResultsList" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResultsAPI } from '@/api'
export default {
  name: 'SearchResults',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      finished: false,
      searchResultsList: [],
      page: 1, // 页数，不传默认为1
      pre_page: 20,
      error: false // 是否显示错误
    }
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      try {
        // 1. 请求获取数据
        const { data } = await getSearchResultsAPI({
          page: this.page,
          pre_page: this.pre_page,
          q: this.searchText
        })
        console.log(data)
        // 2. 将数据添加到数据列表中
        const { results } = data.data
        this.searchResultsList.push(...results)
        // 3. 将本次加载中的 loading 关闭
        this.loading = false
        // 4. 判断是否还有数据
        //    如果有，则更新获取下一个数据的页面
        //    如果没有， 则将加载状态 finished 设置为结束 显示没有数据可以加载
        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
        // 测试错误提示
        /* if(Math.random() > 0.5){
                JSON.parse('asdwdawdwd')
              } */
      } catch (err) {
        // console.log('搜索结果加载失败', err);
        this.error = true
        this.loading = false
        this.finished = false
      }
    }
  }
}
</script>

<style>

</style>
