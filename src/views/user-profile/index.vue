<template>
  <div class="user-proflie">
    <van-nav-bar
        class="page-nav-bar"
        title="个人信息"
        left-arrow
        @click-left="$router.back()"
    />
    <van-cell title="头像" is-link>
        <van-image
            class="avatar"
            fit="cover"
            :src="userProfile.photo"
            round
        />
    </van-cell>
    <!-- 昵称 -->
    <van-cell
     title="昵称"
     :value="userProfile.name"
     is-link
     @click="isUpdataNameShow = true"
    ></van-cell>
    <!-- 昵称 -->
    <!-- 性别 -->
    <van-cell
     title="性别"
     :value="userProfile.gender === 1 ? '女' : '男'"
     is-link
     @click="isUpdataGenderShow = true"
    ></van-cell>
    <!-- /性别 -->
    <!-- 生日 -->
    <van-cell
     title="生日"
     :value="userProfile.birthday"
     is-link
     @click="isUpdataBirthdayShow = true"
    ></van-cell>
    <!-- /生日 -->
    <!-- 编辑昵称 -->
    <van-popup
     v-model="isUpdataNameShow"
     position="bottom"
     :style="{ height: '100%' }"
    >
        <UpdateName
         @closeUpdateName="isUpdataNameShow = false"
         v-model="userProfile.name"
         v-if="isUpdataNameShow"
        ></UpdateName>
    </van-popup>
    <!-- /编辑昵称 -->
    <!-- 编辑性别 -->
    <van-popup
     v-model="isUpdataGenderShow"
     position="bottom"
    >
        <UpdateGender
            v-if="isUpdataGenderShow"
            v-model="userProfile.gender"
            @close="isUpdataGenderShow = false"
            @updateGender="userProfile.gender = $event"
        ></UpdateGender>
    </van-popup>
    <!-- /编辑性别 -->
    <!-- 编辑生日 -->
    <van-popup
     v-model="isUpdataBirthdayShow"
     position="bottom"
    >
        <UpdateBirthday
            v-if="isUpdataBirthdayShow"
            v-model="userProfile.birthday"
            @close="isUpdataBirthdayShow = false"
            @updateBirthday="userProfile.birthday = $event"
        ></UpdateBirthday>
    </van-popup>
    <!-- /编辑生日 -->
  </div>
</template>

<script>
import { getUserProfileAPI } from '@/api'
import UpdateName from './components/update-name.vue'
import UpdateGender from './components/update-gender.vue'
import UpdateBirthday from './components/update-birthday.vue'
export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday
  },
  data () {
    return {
      userProfile: {},
      isUpdataNameShow: false, // 控制昵称弹出层的显示
      isUpdataGenderShow: false, // 控制性别弹出层的显示
      isUpdataBirthdayShow: false // 控制生日弹出层的显示
    }
  },
  methods: {
    async loadUserProfile () {
      try {
        const { data } = await getUserProfileAPI()
        // console.log(data);
        this.userProfile = data.data
      } catch (err) {
        this.$toast('操作失败，请重试')
      }
    }
  },
  created () {
    this.loadUserProfile()
  }
}
</script>

<style lang="less" scoped>
.user-proflie{
    .avatar{
        width: 60px;
        height: 60px;
    }
    .van-popup{
        background-color: #f5f7f9;
    }
}
</style>
