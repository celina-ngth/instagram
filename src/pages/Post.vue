<template>
   <q-page class="constrain" v-if="$q.screen.gt.xs">
      <q-card class="my-card q-mt-xl" flat bordered v-if="datas">
         <q-card-section horizontal>
            <q-img class="col-6" :src="datas.imageUrl" />

            <q-card-section class="col-6">
               <q-item>
                  <q-item-section avatar>
                     <q-avatar>
                        <img
                           src="https://scontent-cdt1-1.cdninstagram.com/v/t51.2885-19/s320x320/70275920_2472214799494506_5756391156107706368_n.jpg?_nc_ht=scontent-cdt1-1.cdninstagram.com&_nc_ohc=YHFYDqEA-k0AX8_KITQ&tp=1&oh=f24ae19251a2dff00108372a949ed48c&oe=6053AE24"
                        />
                     </q-avatar>
                  </q-item-section>

                  <q-item-section>
                     <q-item-label>Celina</q-item-label>
                     <q-item-label caption>
                        {{ datas.location }}
                     </q-item-label>
                  </q-item-section>

                  <q-item-section side>
                     <q-btn
                        icon="eva-more-horizontal-outline"
                        flat
                        rounded
                        dense
                        size="12px"
                     >
                     <q-menu>
                        <q-list style="min-width: 100px">
                           <q-item clickable v-close-popup>
                              <q-item-section @click="confirm">Supprimer</q-item-section>
                           </q-item>
                        </q-list>
                     </q-menu>
                     </q-btn>
                  </q-item-section>
               </q-item>

               <q-separator />

               <q-card-section>
                  <div>{{ datas.caption }}</div>
                  <div class="text-caption text-grey">
                     {{ datas.date | niceDate }}
                  </div>
               </q-card-section>
            </q-card-section>
         </q-card-section>
      </q-card>
   </q-page>

   <q-page class="constrain" v-else>
      <q-card class="card-post q-mb-md" flat>
         <q-item>
            <q-item-section avatar>
               <q-avatar>
                  <img
                     src="https://scontent-cdt1-1.cdninstagram.com/v/t51.2885-19/s320x320/70275920_2472214799494506_5756391156107706368_n.jpg?_nc_ht=scontent-cdt1-1.cdninstagram.com&_nc_ohc=YHFYDqEA-k0AX8_KITQ&tp=1&oh=f24ae19251a2dff00108372a949ed48c&oe=6053AE24"
                  />
               </q-avatar>
            </q-item-section>

            <q-item-section>
               <q-item-label>Celina</q-item-label>
               <q-item-label caption>
                  {{ datas.location }}
               </q-item-label>
            </q-item-section>

            <q-item-section side>
               <q-btn
                  icon="eva-more-horizontal-outline"
                  flat
                  rounded
                  dense
                  size="12px"
               >
               <q-menu>
                  <q-list style="min-width: 100px">
                     <q-item clickable v-close-popup>
                        <q-item-section @click="confirm">Supprimer</q-item-section>
                     </q-item>
                  </q-list>
               </q-menu>
               </q-btn>
            </q-item-section>
         </q-item>

         <q-separator />

         <q-img :src="datas.imageUrl" />

         <q-card-section>
            <div>{{ datas.caption }}</div>
            <div class="text-caption text-grey">
               {{ datas.date | niceDate }}
            </div>
         </q-card-section>
      </q-card>
   </q-page>
</template>

<script>
import { date } from "quasar";

export default {
   name: "Post",
   props: ["post"],
   data() {
      return {
         datas: {},
      };
   },
   methods: {
      deletePost() {
         this.$axios
            .delete(`${process.env.API}/posts/${this.$route.params.id}`)
            .then(() => {
               this.$q.notify({
                  message: "Post deleted.",
                  actions: [{ label: "Dismiss", color: "white" }],
               });
               this.$router.push("/profil");
            });
      },
      confirm() {
         this.$q
            .dialog({
               title: "Confirmer",
               message: "Supprimer le post",
               cancel: true,
               persistent: true,
            })
            .onOk(() => {
               this.deletePost();
            });
      },
   },
   filters: {
      niceDate(value) {
         return date.formatDate(value, "D MMMM YYYY h:mm");
      },
   },
   beforeMount() {
      if (!this.post) {
         this.$axios
            .get(`${process.env.API}/posts/${this.$route.params.id}`)
            .then((res) => {
               this.datas = res.data;
            });
      } else {
         this.datas = this.post;
      }
   },
};
</script>

<style lang="sass">
</style>