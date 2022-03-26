<template>
  <div class="comment-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
        <CommentItem
         v-for="(item, index) in list"
         :key="index"
         :comment="item"
         @onReply="$emit('onReply', $event)"
        ></CommentItem>
    </van-list>
  </div>
</template>

<script>
import { getCommentsAPI } from '@/api'
import CommentItem from './comment-item.vue'
export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  props: {
    sourceId: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      // 自定义prop验证 validator返回一个布尔值
      validator (value) {
        return ['a', 'c'].includes(value)
      },
      type: String,
      default: 'a'
    }
  },
  data () {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null //
    }
  },
  methods: {
    async onLoad () {
      try {
        // 1. 请求获取数据
        const { data } = await getCommentsAPI({
          type: this.type, // 评论类型 a-对文章的评论 c-对评论的回复
          source: this.sourceId.toString(), // 源id，文章id或评论id
          offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据往后取，不传表示从第一页开始
          limit: 20 // 获取的评论数据的个数，不传有后端默认每页10条
        })
        // console.log(data);
        // 2. 将数据添加到列表中
        const { results } = data.data
        // console.log(1,results);
        this.list.push(...results)
        // 3. 将loading设置为false
        this.loading = false
        // console.log(data.data);
        // 加载成功后将数据传到父组件
        this.$emit('success-load', data.data)
        // 4. 判断是否还有数据
        if (results.length) {
          // 有就更新获取下一页的数据页面
          this.offset = data.data.last_id
        } else {
          // 没有就将 finished 设置结束
          this.finished = true
        }
      } catch (err) {
        this.$toast('获取数据失败')
        console.log(err)
      }
    }
  },
  created () {
    // 由于commentList是要可视界面位置到加载位置才开始加载，所以一开始是没有commentList数据的
    // 那也就没有 评论数量数据
    // 所以一开始就手动加载一遍，将文章评论数量传到父组件
    // 但是手动加载又没有vant组件自带的loading效果 所以手动设置 loading = true
    this.loading = true
    this.onLoad()
  }
}
</script>

<style>

</style>
