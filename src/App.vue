<template>
  <!--
    <v-app>
    <v-app-bar
      app
    >
    <v-app-bar-nav-icon @click="drawer =!drawer" />
    <v-toolbar-title>Test Page</v-toolbar-title>
      <v-spacer></v-spacer>
      <site-sign></site-sign>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Application
          </v-list-item-title>
          <v-list-item-subtitle>
            subtext
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <site-menu></site-menu>
    </v-navigation-drawer>

    <v-main>
    <router-view />
    </v-main>

  </v-app>
  -->
  <div>
    <element-menu></element-menu>
    <router-view />
  </div>
</template>

<script>
import elementMenu from './views/elementTest.vue'

export default {
  components: { elementMenu },
  // siteMenu, siteSign,
  name: 'App',
  data () {
    return {
      drawer: false
    }
  },
  mounted () {

  }
}
</script>
