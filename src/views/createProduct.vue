<template>
    <!-- 새 글 작성 -->
    <h1 class="centered">중고거래 글쓰기</h1>
    <el-card class="box-card">
      <el-form ref="form" label-width="120px" v-model="form">

        <el-form-item label="글 제목">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item label="카테고리 선택">
          <el-select placeholder="카테고리를 선택해 보세요!" v-model="form.category">
              <el-option v-for="category in $store.state.categories" :key="category" :label= category :value= category></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="$가격">
          <el-input v-model="form.price" placeholder="가격을 입력해보세요!"></el-input>
        </el-form-item>

      <el-form-item label="내용">
        <el-input type="textarea" v-model="form.content" placeholder="내용을 입력해주세요! 가품 및 판매금지목은 게시가 제한될 수 있어요!"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="create">완료</el-button>
        <el-button @click="$router.push('/')">닫기</el-button>
      </el-form-item>

      </el-form>
    </el-card>
<!--
    <div>
      title = {{form.title}}
      category = {{form.category}}
      price = {{form.price}}
      content = {{form.content}}
      uid = {{this.$store.state.fireUser.uid}}
    </div>
-->
</template>

<script>
import firebase from 'firebase'
const db = firebase.firestore()

export default {
  data () {
    return {
      form: {
        title: '',
        category: '',
        price: null,
        content: ''
        //  uid: this.uid
      }
    }
  },
  methods: {
    create () {
      db.collection('products').add({
        title: this.form.title,
        category: this.form.category,
        price: this.form.price,
        content: this.form.content,
        uid: this.$store.state.fireUser.uid
      })
        .then((docRef) => {
          console.log('Document written with ID: ', docRef.id)
          this.open1()
          this.$router.push('/')
        })
        .catch((error) => {
          console.error('Error adding document: ', error)
        })
    },
    open1 () {
      this.$notify({
        title: '성공!',
        message: '성공적으로 글을 작성했어요',
        type: 'success'
      })
    }
  }
}
</script>

<style>
.centered {
  text-align: center
}
</style>
