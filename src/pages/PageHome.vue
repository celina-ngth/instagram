<template>
   <q-page class="constrain q-pa-md">
      <div class="row q-col-gutter-lg">
         <div class="col-12 col-sm-8">
            <template v-if="!loadingPosts && posts.length">
               <q-card
                  v-for="post in posts"
                  :key="post.id"
                  class="card-post q-mb-md"
                  flat
                  bordered
               >
                  <q-item>
                     <q-item-section avatar>
                        <q-avatar>
                           <img :src="post.avatar" />
                        </q-avatar>
                     </q-item-section>

                     <q-item-section>
                        <q-item-label>{{ post.username }}</q-item-label>
                        <q-item-label caption>
                           {{ post.location }}
                        </q-item-label>
                     </q-item-section>
                  </q-item>
                  <q-separator />

                  <q-img :src="post.imageUrl" />

                  <q-card-section>
                     <div>{{ post.caption }}</div>
                     <div class="text-caption text-grey">
                        {{ post.date | niceDate }}
                     </div>
                  </q-card-section>
               </q-card>
            </template>
            <template v-else-if="!loadingPosts && !posts.length">
               <h5 class="text-center text-grey">No posts yet</h5>
            </template>
            <template v-else>
               <q-card flat bordered>
                  <q-item>
                     <q-item-section avatar>
                        <q-skeleton
                           type="QAvatar"
                           animation="fade"
                           size="40px"
                        />
                     </q-item-section>

                     <q-item-section>
                        <q-item-label>
                           <q-skeleton type="text" animation="fade" />
                        </q-item-label>
                        <q-item-label caption>
                           <q-skeleton type="text" animation="fade" />
                        </q-item-label>
                     </q-item-section>
                  </q-item>

                  <q-skeleton height="200px" square animation="fade" />

                  <q-card-section>
                     <q-skeleton
                        type="text"
                        class="text-subtitle2"
                        animation="fade"
                     />
                     <q-skeleton
                        type="text"
                        width="50%"
                        class="text-subtitle2"
                        animation="fade"
                     />
                  </q-card-section>
               </q-card>
            </template>
         </div>
         <div class="col large-screen-only">
            <q-item class="fixed">
               <q-item-section avatar>
                  <q-avatar size="48px">
                     <img
                        src="https://scontent-cdt1-1.cdninstagram.com/v/t51.2885-19/s320x320/70275920_2472214799494506_5756391156107706368_n.jpg?_nc_ht=scontent-cdt1-1.cdninstagram.com&_nc_ohc=YHFYDqEA-k0AX8_KITQ&tp=1&oh=f24ae19251a2dff00108372a949ed48c&oe=6053AE24"
                     />
                  </q-avatar>
               </q-item-section>

               <q-item-section>
                  <q-item-label>Celina</q-item-label>
                  <q-item-label caption>𝕮</q-item-label>
               </q-item-section>
            </q-item>
         </div>
      </div>
   </q-page>
</template>

<script>
import firebase from "firebase";
import { date } from "quasar";

export default {
   name: "PageHome",
   data() {
      return {
         posts: [
            {
               username: "",
               avatar: "",
            },
         ],
         loadingPosts: false,
      };
   },
   methods: {
      thisCurrentUser() {
         var user = firebase.auth().currentUser;
         if (!user) {
            this.$router.push("/authentication");
         }
      },
      getAuthor() {
         this.posts.forEach((post) => {
            firebase
               .firestore()
               .collection("users")
               .where("id", "==", post.author)
               .get()
               .then((results) => {
                  results.forEach((doc) => {
                     post.username = doc.data().username,
                     post.avatar = doc.data().avatar;

                  });
                  this.$forceUpdate()
                  this.loadingPosts = false;
               })
               .catch((error) => {
                  console.log("Error getting documents: ", error);
               });
         });
      },
   },
   computed: {
      
   },
   filters: {
      niceDate(value) {
         return date.formatDate(value, "D MMMM YYYY h:mm");
      },
   },
   beforeCreate() {
      this.$axios
         .get(`${process.env.API}/posts`)
         .then((res) => {
            this.posts = res.data;
            this.getAuthor();
         })
         .catch((error) => {
            console.log(error);
            this.$q.dialog({
               title: "Error",
               message: "Could not download posts",
            });
         });
   },
   created() {},
   beforeMount() {},
   mounted() {
      this.thisCurrentUser();
   },
   beforeUpdate() {
   },
};
</script>

<style lang="sass">
.card-post
   .q-img
      min-height: 200px
</style>