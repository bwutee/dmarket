<template>
    <h1>
        이런! 사용자님의 위치가 등록되있지 않아요!
        <span style='font-size:100px;'>&#128546;</span>
    </h1>
    <div class="formBox">
        <label for="locationSelector"> 위치를 선택해주세요 :D </label> <br>
        <el-select v-model="selectedLocation" placeholder="위치" id="locationSelector" style="margin-left: 12%;">
            <el-option
            v-for="location in locationList"
            :key="location.value"
            :label="location.label"
            :value="location.value">
            </el-option>
        </el-select>
    </div>

    <el-button class="center" :disabled="!selectedLocation" @click="saveLocation">저장</el-button>

</template>

<script>
import firebase from 'firebase'
export default {
  data () {
    return {
      locationList: [{ value: '영등포구', label: '영등포구' },
        { value: '신길 제1동', label: '신길 제1동' },
        { value: '신길 제2동', label: '신길 제2동' },
        { value: '신길 제3동', label: '신길 제3동' },
        { value: '신길 제4동', label: '신길 제4동' },
        { value: '신길 제5동', label: '신길 제5동' },
        { value: '도림동', label: '도림동' },
        { value: '대림동', label: '대림동' },
        { value: '문래동1가', label: '문래동1가' }],
      selectedLocation: ''
    }
  },
  methods: {
    saveLocation () {
      var db = firebase.firestore()
      const userData = firebase.auth().currentUser
      const userEmail = userData.email
      const usersRef = db.collection('users')
      usersRef.where('email', '==', userEmail).get().then(snapshot => {
        const docID = snapshot.docs[0].id
        db.collection('users').doc(docID).update({
          location: this.selectedLocation
        })
          .then(() => {
            console.log('Document successfully written!')
            this.$router.push('/')
            this.open1()
          })
          .catch((error) => {
            console.error('Error writing document: ', error)
          })
      })

      this.$store.commit('user/setLocation', { location: this.selectedLocation })
      console.log(this.$store.getters['user/returnUserInfo'])
    },
    open1 () {
      this.$notify({
        title: '성공!',
        message: '성공적으로 위치를 업데이트했어요!',
        type: 'success'
      })
    }
  }
}
</script>

<style>
h1 {
    text-align: center;
    padding-bottom: 5%;
}
label {
    font-size: 18px;
    display: block;
    text-align: center;
}
.formBox {
    margin: auto;
    width: 20%;
    padding: 2%;
    border: 1px solid #d3d3d3;
    border-radius: 10px;
}
.center {
  margin-top: 2%;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
