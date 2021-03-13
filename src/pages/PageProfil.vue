<template>
   <q-page class="constrain">
      <div class="row">
         <q-card class="my-card bg-grey-1 q-ma-md" flat>
            <q-item>
               <q-item-section avatar>
                  <q-avatar
                     :size="$q.screen.gt.xs ? '150px' : '77px'"
                     :class="$q.screen.gt.xs ? 'q-mx-lg' : 'q-mx-xs'"
                  >
                     <img :src="profil.avatar" />
                  </q-avatar>
               </q-item-section>

               <q-item-section>
                  <q-item-label
                     :class="
                        $q.screen.gt.xs ? 'text-h5 q-py-sm' : 'text-h6 q-py-xs'
                     "
                  >
                     {{ profil.username }}
                     <q-btn
                        @click="editProfil"
                        color="grey-7"
                        class="q-px-sm"
                        label="Modifier mon profil"
                        size="0.5em"
                        icon-right="eva-settings-2-outline"
                        outline
                        dense
                     />
                  </q-item-label>
                  <q-item-label
                     :class="
                        $q.screen.gt.xs
                           ? 'text-subtitle1 q-py-sm'
                           : 'text-subtitle2 q-py-xs'
                     "
                  >
                     {{ posts.length }} publications
                  </q-item-label>
                  <q-item-label class="text-subtitle1 text-weight-medium">{{
                     profil.name
                  }}</q-item-label>
                  <q-item-label
                     :class="
                        $q.screen.gt.xs ? 'text-subtitle1' : 'text-subtitle2'
                     "
                  >
                     {{ profil.bio }}
                  </q-item-label>
               </q-item-section>
            </q-item>
         </q-card>
      </div>

      <div class="row posts">
         <div class="col-4" v-for="post in posts" :key="post.id">
            <q-img :src="post.imageUrl" :ratio="1" @click="getPost(post)" />
         </div>
      </div>
   </q-page>
</template>

<script>
import firebase from "firebase";

export default {
   name: "PageHome",
   data() {
      return {
         posts: [],
          profil: {
            avatar: "",
            name: "",
            username: "",
            bio: "",
            author: "",
            mail: ""
         },
         loadingPosts: false,
         windowWidth: window.innerWidth,
      };
   },
   methods: {
      getPosts() {
         this.loadingPosts = true;
         this.$axios
            .get(`${process.env.API}/profil`, {
               params: {
                  author: this.$route.query.user
               },
            })
            .then((res) => {
               this.posts = res.data.sort(function (a, b) {
                  return b["date"] - a["date"];
               });
               this.loadingPosts = false;
            })
            .catch(() => {
               this.$q.dialog({
                  title: "Error",
                  message: "Could not download posts",
               });
               this.loadingPosts = false;
            });
      },
      getPost(post) {
         this.$router.push({
            name: "post",
            params: {
               id: post.id,
               post,
            },
         });
      },
      currentUser() {
         firebase
            .firestore()
            .collection("users")
            .doc(this.$route.query.user)
            .get()
            .then((user) => {
               if (user.exists) {
                  this.profil.avatar = user.data().avatar;
                  this.profil.name = user.data().name;
                  this.profil.username = user.data().username;
                  this.profil.bio = user.data().bio;
                  this.profil.author = user.data().author;
                  this.profil.mail = user.data().mail;
               } else {
                  console.log("No such user!");
               }
            })
            .catch((error) => {
               console.log("Error getting document:", error);
            });
      },
      editProfil() {
         this.$router.push("/profil/edit");
      },
   },
   created() {
      this.getPosts();
   },
   mounted() {
      window.onresize = () => {
         this.windowWidth = window.innerWidth;
      };
      this.currentUser();
   },
};
</script>

<style lang="sass">
@media (min-width: $breakpoint-sm-min)
   .posts
      padding: 10px
   .col-4
      padding: 10px
@media (max-width: $breakpoint-xs-max)
   .col-4
      padding: 2px
.q-card
   width: 100%
</style>