
<template>
<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" router>

<!-- 하단 버튼 (홈/동네생활/내근처/채팅/나의당근)-->
<el-row>
  <el-col :span="12">
      <el-row>
<el-menu-item index="/">HOME</el-menu-item>

  <el-menu-item index="3">
      <i class="el-icon-office-building"></i>
      동네생활
  </el-menu-item>

  <el-menu-item index="4">
      <i class="el-icon-location-information"></i>
      내근처
  </el-menu-item>

  <el-menu-item index="4">
      <i class="el-icon-chat-round"></i>
      채팅
  </el-menu-item>

  <el-menu-item index="4">
      <i class="el-icon-user"></i>
      나의당근
  </el-menu-item>

      </el-row>
  </el-col>

  <el-col :span="10"></el-col>

  <!-- 상단 버튼 (검색/카테고리/알림/기타)-->
  <el-col :span="2">
    <el-row>

  <div v-if="$store.state.fireUser">
  <el-image
      style="width: 30px; height: 30px"
      :src="$store.state.fireUser.photoURL"
      :fit="scale-down"></el-image>
  </div>

  <div v-if="!$store.state.fireUser">
    <el-menu-item @click="loginWithGoogle">로그인</el-menu-item>
  </div>

  <div v-if="$store.state.fireUser">
    <el-submenu>
        <template #title>
        <i class="el-icon-more-outline"></i>
        </template>
        <el-menu-item @click="signOut">로그아웃</el-menu-item>
        <el-menu-item>내 계정</el-menu-item>
    </el-submenu>
  </div>

    </el-row>
  </el-col>
</el-row>
</el-menu>

</template>

<script>
import firebase from 'firebase'

export default {
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      loading: false
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    goHome () {
      console.log('gohome')
    },
    async loginWithGoogle () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().languageCode = 'ko'
      this.loading = true
      try {
        // const sn =
        await firebase.auth().signInWithPopup(provider)
        // this.$store.commit('setFireUser', sn.user)
      } finally {
        this.loading = false
        console.log('login')
      }
    },
    signOut () {
      firebase.auth().signOut()
    }
  }
}
</script>

<style>

</style>
