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
                        <q-avatar @click="goToProfil(post.author)">
                           <img :src="post.avatar"/>
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
                        :src="profil.avatar"
                     />
                  </q-avatar>
               </q-item-section>

               <q-item-section>
                  <q-item-label>{{ profil.username }}</q-item-label>
                  <q-item-label caption>{{ profil.bio }}</q-item-label>
               </q-item-section>
            </q-item>
         </div>
      </div>
   </q-page>
</template>

<script>
import firebase from "firebase";
import { date } from "quasar";
import { currentUser } from "../mixins/currentUser.js";


export default {
   name: "PageHome",
   mixins: [currentUser],
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
      isConnected() {
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
                  console.log("Erreur de récupération des documents ", error);
               });
         });
      },
      goToProfil(author) {
         this.$router.push(`/profil?user=${author}`)
      }
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
               title: "Erreur",
               message: "Les posts n'ont pas pu être chargés",
            });
         });
   },
   mounted() {
      this.isConnected();
   },
};
</script>

<style lang="sass">
.card-post
   .q-img
      min-height: 200px
</style>