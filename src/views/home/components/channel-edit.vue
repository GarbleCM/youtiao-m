<template>
  <div class="channel-edit">
      <!-- 频道编辑 -->
      <van-cell :border="false" class="title-text">
          <div slot="title">频道编辑</div>
          <van-button
            type="danger"
            plain
            round
            size="mini"
            class="edit-btn"
            @click="isEdit = !isEdit"
          >
             {{isEdit? "完成":"编辑"}}
          </van-button>
      </van-cell>
      <van-grid :gutter="10" class="my-grid">
        <van-grid-item
         class="grid-item"
         v-for="(channel,index) in myChannels"
         :key="channel.id"
         @click="onMyChannelClick(channel,index)"
        >
            <van-icon
             slot="icon"
             name="clear"
             v-show="isEdit && !fiexdChannels.includes(channel.id)"
            >
            </van-icon>
            <span
             slot="text"
             class="text"
             :class="{highlight: index === active}"
            >
                {{channel.name}}
            </span>
        </van-grid-item>
      </van-grid>
      <!-- /频道编辑 -->
      <!-- 频道推荐 -->
      <van-cell :border="false" class="title-text">
          <div slot="title">频道推荐</div>
      </van-cell>
      <van-grid :gutter="10" class="recommend-grid">
        <van-grid-item
         class="grid-item"
         icon="plus"
         v-for="channel in recommendChannels"
         :key="channel.id"
         @click="onAddChannel(channel)"
        >
            <span
             slot="text"
             class="text"
            >
                {{channel.name}}
            </span>
        </van-grid-item>
      </van-grid>
      <!-- /频道推荐 -->
  </div>
</template>

<script>
import { getAllChannelsAPI, addUserChannelsAPI, deleteUserChannelsAPI } from '@/api'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  props: {
    // getItem("TOUTIAO_CHANNELS")||
    myChannels: {
      type: Array,
      require: true
    },
    active: {
      type: Number,
      require: true
    }
  },
  data () {
    return {
      allChannels: [],
      isEdit: false, // 控制编辑按钮的显示
      fiexdChannels: [0, 7] // 固定频道 无法删除，元素为频道id
    }
  },
  // 计算属性会观测内部依赖数据的变化
  // 如果依赖的数据发生变化，则计算属性会重新计算
  computed: {
    recommendChannels () {
      // 使用filter遍历要筛选符合一定条件的数组元素到新数组中
      // 注意：新数组是filter内部自己创建的，返回的就是该创建的数组
      // Array.filter(callback(遍历的当前元素，当前下标，被遍历的数组){
      //      return 布尔值 - 若为true则当前元素push到创建的数组中
      // })
      return this.allChannels.filter(channel => {
        return !this.myChannels.find(mychannel => {
          return mychannel.id === channel.id
        })
      })
      /* const channels = []
        this.allChannels.forEach(channel =>{
            // 使用find 遍历数组，
            // 找到满足条件的元素项返回该元素
            // 否则返回 undefiend
            const ret = this.myChannels.find(myChannel =>{
                return myChannel.id === channel.id
            })
            // 如果我的频道中不包括该频道则把该频道放到推荐频道
            if(!ret){
                channels.push(channel)
            }
        })
        return channels */
    },
    ...mapState(['user'])
  },
  methods: {
    async loadAllChannels () {
      try {
        const { data } = await getAllChannelsAPI()
        console.log(data)
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toast('推荐频道获取失败')
      }
    },
    async onAddChannel (channel) {
      this.myChannels.push(channel)
      // 数据持久化处理
      if (this.user) {
        // 已登录，把数据请求接口放到线上
        try {
          const res = await addUserChannelsAPI({
            id: channel.id, // 频道id
            // 该序号是数组更新后被添加频道的 index+1
            seq: this.myChannels.length // 序号
          })
          console.log(res)
        } catch (err) {
          console.log('数据添加失败', err)
        }
      } else {
        setItem('TOUTIAO_CHANNELS', this.myChannels)
        // 未登录，把数据存储到本地
      }
    },
    onMyChannelClick (channel, index) {
      if (this.isEdit) {
        // 如果删除的是固定频道就不让删除 - return 不继续执行下面代码
        if (this.fiexdChannels.includes(channel.id)) {
          return
        }
        // 编辑状态 删除我的频道
        if (index <= this.active) {
          this.$emit('update-active', this.active - 1, true)
        }
        this.myChannels.splice(index, 1)
        // 处理数据吃持久化
        this.deleteChannel(channel)
      } else {
        // 非编辑状态 跳转频道页面
        this.$emit('update-active', index, false)
      }
      // console.log(index);
    },
    async deleteChannel (channel) {
      if (this.user) {
        // 已登录， 则将数据更新到服务器
        try {
          const res = await deleteUserChannelsAPI(channel.id)
          console.log(res)
        } catch (error) {
          this.$toast('删除频道保存失败')
        }
      } else {
        // 未登录，将数据更新到本地
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    }
  },
  created () {
    this.loadAllChannels()
  }
}
</script>

<style lang="less" scoped>
.channel-edit{
    padding: 87px 0;
    /deep/.title-text{
        display: flex;
        align-items: center;
        font-size: 32px;
        color: #333;
        .edit-btn{
            font-size: 26px;
            // padding: 0 26px;
            color: #f85c5c;
            width: 104px;
            height: 48;
            line-height: 48px;
        }
    }
    /deep/.grid-item{
        width: 160px;
        height: 86px;
        .van-grid-item__content{
            white-space: nowrap;
            background-color: #f4f5f6;
        }
        .van-grid-item__text,.text{
            font-size: 28px;
            color: #222222;
            margin-top: 0;

        }
        .text{
            margin-left: 3px;
        }
        .highlight{
            color: red;
        }
    }
    /deep/.recommend-grid{
        .grid-item{
            .van-grid-item__content{
                flex-direction: row;
                .van-grid-item__text{
                    margin-top: 0;
                    margin-left: 6px;
                }
                .van-grid-item__icon{
                    font-size: 28px;
                }
            }
        }
    }
    /deep/.my-grid{
        // 由于使用了插槽 所以 clear图标有了一个有定位的父容器
        // 所以将这个父元素的定位消失
        .van-grid-item__icon-wrapper{
            position: unset;
        }
        .van-icon-clear{
            position: absolute;
            top: -10px;
            right: -10px;
            z-index: 2;
            font-size: 30px;
            color: #cacaca;
        }
    }
}
</style>
