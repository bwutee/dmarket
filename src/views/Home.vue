<template>
  <div id="app">
    <div id="screen">
    <el-row>
      <el-col :span="8" style="margin-top: 15px; margin-left: 15px;">
        {{location}}
      </el-col>
      <el-col :span="8">
      <div>

        <div style="margin-top: 15px;">
          <el-input placeholder="동네이름, 물품명등을 검색해보세요!" v-model="input3" class="input-with-select">
            <template #prepend>
              <el-select v-model="selectCategory" placeholder="카테고리" >
                <el-option
                v-for="category in $store.state.categories"
                :key="category"
                :label= category
                :value= category
                ></el-option>
              </el-select>
            </template>
            <template #append>
              <el-button icon="el-icon-search"></el-button>
            </template>
          </el-input>
        </div>
      </div>
      </el-col>
    </el-row>

    <el-button icon="custom-icon el-icon-plus" @click="create" circle></el-button>
    <el-button icon="custom-icon el-icon-refresh" @click="read" circle></el-button>
    <br /> <br />

<!-- 상품 목록 -->
  <div class="products">
   <el-row>
      <el-col
      :span="4"
      v-for="(o, index) in products"
      :key="o"
      :offset="index > 0 ? 3 : 3"
      >
        <el-card @click="requestProductDetail(products[index].id)" shadow="hover" class="productCard">

          <el-image
            style="width: 300px; height: 300px"
            :src= products[index].image
            fit= fit
            class="image"
          >
          </el-image>

          <div>
            <span style="font-size: 17px"> {{products[index].title}} </span> <br>
            <span style="font-weight: bold; font-size: 20px"> {{convertPrice(products[index].price)}}원 </span>

            <div class="bottom">
              <time class="time">{{products[index].location}}</time>
            </div>
          </div>

        </el-card>
      </el-col>
    </el-row>
  </div>
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
      writeCard: false,
      selectCategory: ''
    }
  },
  created () {
    this.subscribe()
  },
  methods: {
    convertPrice (price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    async subscribe () {
      db.collection('products').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.products.push(
            {
              title: doc.data().title,
              price: doc.data().price,
              image: doc.data().image,
              location: doc.data().location,
              id: doc.id
            }
          )
        })
      }).catch((error) => {
        console.log('Error getting documents: ', error)
      })
    },
    create () {
      if (this.$store.state.user.uid) {
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
                image: doc.data().image,
                location: doc.data().location,
                id: doc.id
              }
            )
            // console.log(doc.data())
            // console.log(this.products)
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
  #screen{
    background-color: rgb(240, 242, 246);
  }
  .products{
    margin: auto;
    width: 70%;
    background-color: white;
  }
  .centered{
    left: 50%;
  }
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .button {
    padding: 0;
    min-height: auto;
  }

  .image {
    width: 100%;
    display: block;
  }
  .el-select .el-input {
    width: 110px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .custom-icon {
   font-size: 1.5rem;
  }
  .productCard{
    width: 350px;
  }

</style>
