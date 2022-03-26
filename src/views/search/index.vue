<template>
  <div class="search-container">
    <!--
        Tips: 在 van-search 外层增加 form 标签，
        且 action 不为空，即可在 iOS 输入法中显示搜索按钮。
     -->
    <!-- 搜索栏 -->
    <form action="/" class="search-form">
        <van-search
            v-model="searchText"
            show-action
            placeholder="请输入搜索关键词"
            @search="onSearch"
            @cancel="onCancel"
            background="#3296fa"
            @focus="isResultsShow = false"
        />
    </form>
    <!-- /搜索栏 -->
    <!-- 搜索结果 -->
    <SearchResults
     v-if="isResultsShow"
     :searchText="searchText"
    >
    </SearchResults>
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <SearchSuggestion
        v-else-if="searchText"
        :SearchText ="searchText"
        @search="onSearch"
    >
    </SearchSuggestion>
    <!-- /联想建议 -->

    <!-- 搜索历史记录 -->
    <SearchHistory
     v-else
    :searchHistories="searchHistories"
    @clearAllHistory="searchHistories = []"
    @searchClick="onSearch"
    ></SearchHistory>
    <!-- /搜索历史记录 -->

  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResults from './components/search-results'
import { setItem, getItem } from '@/utils/storage'
export default {
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResults
  },
  name: 'SearchIndex',
  data () {
    return {
      searchText: '',
      isResultsShow: false,
      searchHistories: getItem('TOUTIAO_SEARCH_HISTORIES') || []
    }
  },
  methods: {
    onSearch (val) {
      // 当用户点击联想建议时更新文本框内容
      this.searchText = val

      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
      // 当用户点击联想建议时或回车时显示搜索结果
      this.isResultsShow = true
    },
    onCancel () {
      // 当用户点击取消按钮时
      this.$router.back()
    }
  },
  watch: {
    searchHistories (val) {
      setItem('TOUTIAO_SEARCH_HISTORIES', val)
      if (this.searchHistories.length > 9) {
        this.searchHistories.pop()
      }
    }

  }
}
</script>

<style lang="less" scoped>
.search-container{
    padding-top: 108px;
    .van-search__action{
        color: #ffffff;
    }
    .search-form{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1;
    }
}

</style>
