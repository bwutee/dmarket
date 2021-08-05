<template>
<div id="app">
    <header v-if="loaded">
        <el-row>
            <el-col :span="22">
            <span style="font-size: 24px; font-weight: bold;">
                {{productDetail[0].price}}원
            </span>
            <el-divider direction="vertical" />
            <el-button><i class="el-icon-collection-tag"/></el-button>
            </el-col>

            <el-col :span="2">
            <el-button type="primary">채팅으로 거래하기</el-button>
            </el-col>
        </el-row>
    </header>

    <el-divider></el-divider>

    <div class="productCard">
        <el-row  v-if="loaded">
        <el-image
            style="width: 1000px; height: auto; borderRadius: 6%;"
            :src= productDetail[0].img
            :fit= fit
            >
        </el-image>
        </el-row>

    <el-divider></el-divider>

        <el-row v-if="loaded">
        <p>
            <el-row class="title">
                {{productDetail[0].title}}
            </el-row>
            <el-row class="sub">
                {{productDetail[0].category}}
            </el-row>
            <el-row class="content">
                {{productDetail[0].content}}
            </el-row>
            <el-row class="sub">
                관심 0 조회 0
            </el-row>
        </p>
        </el-row>
    </div>
</div>
</template>

<script>
import firebase from 'firebase'
const db = firebase.firestore()
export default {
  data () {
    return {
      productDetail: [],
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      loaded: false
    }
  },
  created () {
    this.loaded = false
    this.subscribe()
  },
  methods: {

    async subscribe () {
      db.collection('products').doc(this.$store.state.productId).get().then((sn) => {
        // console.log(sn.data())
        this.productDetail.push(
          {
            img: sn.data().image,
            title: sn.data().title,
            category: sn.data().category,
            content: sn.data().content,
            price: sn.data().price,
            id: sn.id
          }
        )
        // console.log(this.productDetail)
        this.loaded = true
      }).catch((error) => {
        console.error('Error getting documents: ', error)
      })
    }

  }
}
</script>

<style>

.title{
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 15px;
}
.sub{
    font-size: 16px;
    color: gray;
    margin-bottom: 10px;
}
.content{
    font-size: 20px;
    margin-bottom: 10px;
}
.productCard{
  margin: auto;
  width: 50%;
}
</style>
