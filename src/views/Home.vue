<template>
  <div id="app">
    <el-row>
      <el-col :span="21"><div>
        <h2>{{ location }}</h2>
        </div></el-col>
      <el-col :span="3"><div>
          <el-divider direction="vertical"></el-divider>
          <el-button>
          <i class="el-icon-search"></i>
          </el-button>
          <el-button>
          <i class="el-icon-tickets"></i>
          </el-button>
          <el-button>
          <i class="el-icon-bell"></i>
          </el-button>
        </div></el-col>
      <el-divider direction="horizontal"></el-divider>
    </el-row>

    <h1>This is the home page</h1>
    <el-button @click="create"><i class="el-icon-plus"></i></el-button>
    <el-button @click="read"><i class="el-icon-refresh"></i></el-button>
    <br /> <br />

    <!-- 상품 목록 카드 -->
    <div v-for="(product, i) in products" :key="i">
      <el-row>
      <el-col :span="23">
      <span style="font-size: 23px"> {{products[i].title}} </span> <br />
      <span> location </span> <br />
      <span style="font-weight: bold"> {{products[i].price}} </span>
      </el-col>

      <el-col :span="1">
      <el-button @click="requestProductDetail(products[i].id)"><i class="el-icon-arrow-right" /></el-button>
      </el-col>
      <el-divider></el-divider>
      </el-row>
    </div>

  <v-app>
  </v-app>
  </div>
</template>

<script>
import firebase from 'firebase'
const db = firebase.firestore()
export default {
  data () {
    return {
      location: '신길제3동',
      products: [],
      writeCard: false
    }
  },
  created () {
    this.subscribe()
  },
  methods: {
    async subscribe () {
      db.collection('products').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.products.push(
            {
              title: doc.data().title,
              price: doc.data().price,
              id: doc.id
            }
          )
        })
      }).catch((error) => {
        console.log('Error getting documents: ', error)
      })
    },
    create () {
      if (this.$store.state.fireUser) {
        this.$router.push('createProduct')
      } else {
        this.$notify.error({
          title: '이런 😥',
          message: '로그인 해주세요!'
        })
      }
      // this.writeCard = true
    },
    read () {
      this.products = []
      db.collection('products')
        .get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.products.push(
              {
                title: doc.data().title,
                price: doc.data().price,
                id: doc.id
              }
            )
            // console.log(doc.data())
            console.log(this.products)
          })
        }).catch((error) => {
          console.error('Error getting documents: ', error)
        })
    },
    requestProductDetail (requestID) {
      console.log(requestID)
      this.$router.push('productDetail')
      this.$store.commit('setProductId', requestID)
    }

  }
}
</script>

<style>
.centered{
  left: 50%;

}
</style>
