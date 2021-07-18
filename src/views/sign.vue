<template>
  <v-btn icon v-on="on" @click="loginWithGoogle"> <v-icon>mdi-account</v-icon></v-btn>
  <v-btn icon @click="signOut" v-if="$store.state.fireUser"> <v-icon>mdi-logout</v-icon></v-btn>
  <div v-if="$store.state.fireUser">
  <v-avatar size="32">
    <v-img :src="$store.state.fireUser.photoURL" />
  </v-avatar>
  </div>
  <v-menu>

  </v-menu>
</template>

<script>
import firebase from 'firebase'
// import db from '@/plugins/db'
export default {
  data () {
    return {
      loading: false
    }
  },
  methods: {
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
