
<template>
<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router>

<!-- 하단 버튼 (홈/동네생활/내근처/채팅/나의당근)-->
<el-row>
  <el-col :span="12">
      <el-row>
<el-menu-item index="/" id="topMenuItem">HOME</el-menu-item>

  <el-menu-item index="3" id="topMenuItem">
      <i class="el-icon-office-building"></i>
      동네생활
  </el-menu-item>

  <el-menu-item index="4" id="topMenuItem">
      <i class="el-icon-location-information"></i>
      내근처
  </el-menu-item>

  <el-menu-item index="4" id="topMenuItem">
      <i class="el-icon-chat-round"></i>
      채팅
  </el-menu-item>

  <el-menu-item index="4" id="topMenuItem">
      <i class="el-icon-user"></i>
      나의당근
  </el-menu-item>

      </el-row>
  </el-col>

  <el-col :span="10"></el-col>

  <!-- 프로필사진/알림/(내 계정/로그아웃)-->
  <el-col :span="2">
    <el-row>

  <div v-if="$store.getters['user/returnUserState']">
  <el-image
      style="width: 47px; height: 47px; border-radius: 40%;"
      :src="$store.state.user.photoURL"
      :fit="scale-down"></el-image>
  </div>

  <div v-if="!$store.getters['user/returnUserState']">
    <el-menu-item @click="callSignIn">로그인</el-menu-item>
  </div>

  <div v-if="$store.getters['user/returnUserState']">
    <el-submenu>
        <template #title>
        <i class="el-icon-more-outline"></i>
        </template>
        <el-menu-item id="subMenuItem">내 계정</el-menu-item>
        <el-menu-item id="subMenuItem">알림</el-menu-item>
        <el-menu-item @click="signOut" id="subMenuItem">로그아웃</el-menu-item>
    </el-submenu>
  </div>

    </el-row>
  </el-col>
</el-row>
</el-menu>

</template>

<script>
import firebase from 'firebase/app'
import signInWithGoogle from '@/components/signInWithGoogle.js'
export default {
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      loading: false
    }
  },
  setup () {
    const { signIn, signOut } = signInWithGoogle()
    return { signIn, signOut }
  },
  methods: {
    callSignIn () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
    }
  }
}
</script>

<style>
#topMenuItem {
  font-size: 18px;
}
#subMenuItem {
  font-size: 15px;
}
:is(#topMenuItem, #subMenuItem ):hover {
  color: orange;
}
</style>
