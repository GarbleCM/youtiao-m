<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDelShow">
        <span @click="$emit('clearAllHistory')">全部删除</span>
        <span class="finished" @click="isDelShow = false">完成</span>
      </div>
      <van-icon
       v-else
       name="delete"
       @click="isDelShow = true"
      />
    </van-cell>
    <van-cell
     :title="item"
     v-for="(item, index) in searchHistories"
     :key="index"
     @click="myHistoryClick(item, index)"
    >
      <van-icon name="close" v-show="isDelShow"/>
    </van-cell>

  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    // Props 数据
    //  Props 是受父组件数据影响的
    //    如果是普通数据(number，string，Boolean) 绝对不能修改
    //    即使该了也不会传导给父组件
    //
    //    如果是引用类型 - Array, Object
    //        可以修改,例如 [].push(xxx), obj.xxx = xxx
    //        但是不能重新赋值, xxx = [],即使重新赋值了也不能传导到父组件
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDelShow: false
    }
  },
  methods: {
    // 点击搜索历史记录触发的函数
    myHistoryClick (item, index) {
      if (this.isDelShow) {
        // 删除状态 删除历史记录
        this.searchHistories.splice(index, 1)
      } else {
        // 非删除状态
        this.$emit('searchClick', item)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search-history{
  .finished{
    margin-left: 10px;
  }
}
</style>
