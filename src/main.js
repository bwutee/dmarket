/* import { createApp } from 'vue'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(vuetify)

app.mount('#app')
*/

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

firebase.initializeApp(firebaseConfig)
firebase.auth().onAuthStateChanged(fu => store.commit('setFireUser', fu))

const app = createApp(App)
app.use(store)
app.use(Vuex)
app.use(router)
app.use(vuetify)
app.use(ElementPlus, { locale })
app.mount('#app')
