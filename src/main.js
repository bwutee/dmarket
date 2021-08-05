import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'
import Vuex from 'vuex'

import ElementPlus from 'element-plus'
import './theme/index.css'
import locale from 'element-plus/lib/locale/lang/ko'
import 'dayjs/locale/ko'

import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/firebase-database'
import firebaseConfig from '../firebaseConfig'

import signInWithGoogle from '@/components/signInWithGoogle.js'

firebase.initializeApp(firebaseConfig)

const app = createApp(App)
app.use(store)
app.use(Vuex)
app.use(router)
app.use(vuetify)
app.config.globalProperties.$firestore = firebase.firestore()
app.use(ElementPlus, { locale })
app.mount('#app')
const { signIn } = signInWithGoogle()
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const loggedIn = async () => {
      await signIn()
      if (store.state.user.uid) {
        if (!store.getters['user/ifLocated']) {
          router.push('/setLocation')
        }
      }
    }
    loggedIn()
  }
})
