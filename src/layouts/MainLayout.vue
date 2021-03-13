<template>
   <q-layout view="lHh Lpr lFf">
      <q-header class="bg-white text-grey-10" bordered>
         <q-toolbar class="constrain">
            <q-btn
               to="/camera"
               class="large-screen-only q-mr-sm"
               icon="eva-camera-outline"
               size="18px"
               flat
               round
               dense
            />

            <q-separator vertical inset spaced class="large-screen-only" />

            <q-toolbar-title class="text-grand-hotel text-bold logo">
               <router-link to="/">Instagram</router-link>
            </q-toolbar-title>

            <q-btn
               to="/"
               class="large-screen-only q-mr-sm"
               icon="eva-home-outline"
               size="18px"
               flat
               round
               dense
            />

            <q-btn
               round
               unelevated
               class="large-screen-only"
               dropdown-icon="none"
            >
               <q-avatar size="30px">
                  <img
                     src="https://firebasestorage.googleapis.com/v0/b/quasargram-4e56a.appspot.com/o/nopicture.jpg?alt=media&token=2ecc33b1-517c-4d4c-bf1a-97ab2ee44728"
                  />
               </q-avatar>
               <q-menu>
                  <q-list style="min-width: 200px">
                     <q-item clickable v-close-popup>
                        <q-item-section avatar>
                           <q-icon name="eva-person-outline" />
                        </q-item-section>
                        <q-item-section @click="profil">Profil</q-item-section>
                     </q-item>
                     <q-separator />
                     <q-item clickable v-close-popup>
                        <q-item-section avatar>
                           <q-icon name="eva-power-outline" />
                        </q-item-section>
                        <q-item-section @click="logout">
                           Déconnexion
                        </q-item-section>
                     </q-item>
                  </q-list>
               </q-menu>
            </q-btn>
         </q-toolbar>
      </q-header>

      <q-footer class="bg-white small-screen-only" bordered>
         <q-tabs class="text-grey-10" indicator-color="transparent">
            <q-route-tab to="/" icon="eva-home-outline" />
            <q-route-tab to="/camera" icon="eva-camera-outline" />
            <q-route-tab to="/profil">
               <q-btn round flat padding="none">
                  <q-avatar size="25px">
                     <img
                        src="https://scontent-cdt1-1.cdninstagram.com/v/t51.2885-19/s320x320/70275920_2472214799494506_5756391156107706368_n.jpg?_nc_ht=scontent-cdt1-1.cdninstagram.com&_nc_ohc=YHFYDqEA-k0AX8_KITQ&tp=1&oh=f24ae19251a2dff00108372a949ed48c&oe=6053AE24"
                     />
                  </q-avatar>
               </q-btn>
            </q-route-tab>
         </q-tabs>
      </q-footer>

      <q-page-container class="bg-grey-1">
         <router-view />
      </q-page-container>
   </q-layout>
</template>

<script>
import firebase from "firebase";

export default {
   name: "MainLayout",
   data() {
      return {
         avatar: ""
      };
   },
   methods: {
      profil() {
         let user = firebase.auth().currentUser;
         this.$router.push(`/profil?user=${user.uid}`);
      },
      logout() {
         firebase
            .auth()
            .signOut()
            .then(() => {
               firebase.auth().onAuthStateChanged(() => {
                  this.$router.push("/authentication");
               });
            });
      },
   },
};
</script>


<style lang="sass">
.logo a
   text-decoration: none
   color: black
.q-item__section--avatar
   min-width: 0
.q-toolbar
   @media (min-width: $breakpoint-sm-min)
      height: 70px
   .q-toolbar__title
      font-size: 30px
      @media (max-width: $breakpoint-xs-max)
         text-align: center
   .q-footer
      .q-tab__icon
         font-size: 30px
</style>