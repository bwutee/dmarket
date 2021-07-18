<template>
<div>
    <v-app>
      <h1>Welcome to the Blog!</h1>
      <v-btn icon @click="openWriteDialog"><v-icon>mdi-plus</v-icon></v-btn>
      <v-btn icon @click="readOnce"><v-icon>mdi-refresh</v-icon></v-btn>

<!-- 테스트 카드-->
      <v-card
        class="mx-auto"
        width="800"
        tile
        outlined
      >
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Title</v-list-item-title>
          <v-list-item-subtitle>
            content aslkdfjasl;dkfj safjwepo jasd;lk; jsal;kvsapjof jsaldkf jdspaof dsjf;sdlj
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
        <v-card-actions>
          <v-btn
            outlined
            rounded
            text
            @click="openDialog"
          >
            Edit
          </v-btn>
          <v-btn
            outlined
            rounded
            text
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>

<!-- 포스트 불러오기-->
      <v-card
      class="mx-auto"
      width="800"
      tile
      outlined
      v-for="(post,i) in posts" :key="i">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>{{post.title}}</v-list-item-title>
            <v-list-item-subtitle>
              {{post.content}}
              <br>
              <!--post number = {{i}}-->
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-card-actions>
          <v-btn
            outlined
            rounded
            text
            @click="openDialog(i)"

          >
            Edit
          </v-btn>
          <v-btn
            outlined
            rounded
            text
            @click="deltePost(post.title)"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>

<!-- 글 수정 다일로그 -->
      <v-dialog v-model="dialog">
        <v-card>
          <v-card-title>
            제목 수정
            <v-spacer/>
            <v-btn icon @click="update(postID)"><v-icon>mdi-content-save</v-icon></v-btn>
            <v-btn icon @click="dialog=false"><v-icon>mdi-close</v-icon></v-btn>
          </v-card-title>

          <v-card-text>
            <label>제목</label><br>
            <input v-model="editPost.title" placeholder="여기를 수정해보세요"
            style="width:200px; height:30px; border: 1px solid black;"><br><br>
            <label>내용</label><br>
            <textarea v-model="editPost.content" placeholder="내용을 입력하세요"
            style="width:500px; height:300px; border: 1px solid black;"/>
          </v-card-text>
        </v-card>
      </v-dialog>

<!-- 새 글 작성 다일로그 -->
      <v-dialog v-model="writeDialog">
        <v-card>
          <v-card-title>
            새 글 작성
            <v-spacer/>
            <v-btn icon @click="write"><v-icon>mdi-content-save</v-icon></v-btn>
            <v-btn icon @click="writeDialog=false"><v-icon>mdi-close</v-icon></v-btn>
          </v-card-title>

          <v-card-text>
            <label>제목</label><br>
            <input v-model="newPost.title" placeholder="제목" style="border: 1px solid black;"> <br><br>
            <label>내용</label><br>
            <textarea v-model="newPost.content" placeholder="내용을 입력하세요"
            style="width:500px; height:300px; border: 1px solid black;"/>
          </v-card-text>
        </v-card>
      </v-dialog>

      </v-app>
</div>
</template>

<script>
import firebase from 'firebase'
// import db from '@/plugins/db'
export default {
  components: {
  },
  data () {
    return {
      dialog: false,
      writeDialog: false,
      postID: '',
      posts: [],
      name: 'Home',
      text: '',
      newPost: [
        {
          title: 'test title!',
          content: 'hi welcome'
        }
      ],
      editPost: [
        {
          title: '',
          content: ''
        }
      ]
    }
  },
  created () {
    this.subscribe()
  },
  methods: {

    subscribe () {
      firebase.database().ref().child('posts').on('value', (sn) => {
        const v = sn.val()
        this.posts = v
      }, (e) => {
        console.log(e.message)
      })
    },

    openDialog (i) {
      this.dialog = true
      this.postID = i
      // console.log(this.postID)

      firebase.database().ref().child('posts').child(this.postID).once('value', sn => {
        const data = sn.val()
        // console.log(data)
        this.editPost.title = data.title
        this.editPost.content = data.content
      })
    },

    openWriteDialog () {
      this.newPost.title = ''
      this.newPost.content = ''
      this.writeDialog = true
    },
    async save () {
      try {
        await firebase.database().ref().child('site').update({ title: this.text })
      } catch (e) {
        console.log(e)
      } finally {
        this.dialog = false
      }
    },
    async write () {
      try {
        await firebase.database().ref().child('posts').child(`${this.newPost.title}`).set({
          title: this.newPost.title,
          content: this.newPost.content

        })
      } catch (e) {
        console.log(e)
      } finally {
        this.writeDialog = false
        this.readOnce()
      }
    },
    async readOnce () {
      this.posts = []
      const r = await firebase.database().ref().child('posts')

      r.once('value', snapshot => {
        const data = snapshot.val()
        Object.keys(data).forEach(key => {
          // console.log(key)
          // console.log(data[key])
          this.posts.push(data[key])
          // console.log(this.posts)
        })
      })
    },

    async deltePost (i) {
      try {
        firebase.database().ref().child('posts').child(i).remove()
      } catch (e) {
        console.log(e)
      } finally {
        this.readOnce()
      }

      // console.log(i)
    },

    update (i) {
      firebase.database().ref().child('posts').child(i).update({
        title: this.editPost.title,
        content: this.editPost.content
      }, (error) => {
        if (error) {
          console.log(error)
        } else {
          this.dialog = false
        }
      })
    }

  }
}
</script>
