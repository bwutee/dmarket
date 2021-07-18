<template>
  <div>
    <v-list-item v-for="item in items" :key="item.title" @click="$router.push(`${item.to}`)">
      <v-list-item-content>
        {{ item.title }}
      </v-list-item-content>
    </v-list-item>
  </div>
</template>
<script>
export default {
  props: [],
  data () {
    return {
      items: [
        {
          title: 'home',
          to: '/'
        },
        {
          title: 'about',
          to: '/About'
        },
        {
          title: 'blog',
          to: '/Blog'
        }
      ]
    }
  },
  methods: {
  },
  created () {
  }
}
</script>
