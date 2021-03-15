<template>
   <div class="constrain">
      <div class="row">
         <q-card flat bordered style="width: 100%" class="q-my-xl">
            <q-splitter v-model="splitterModel" style="width: 100%">
               <template v-slot:before>
                  <q-tabs v-model="tab" align="left" vertical no-caps>
                     <q-tab name="mails" label="Modifier mon profil" />
                     <q-tab name="alarms" label="Alarms" />
                  </q-tabs>
               </template>

               <template v-slot:after>
                  <q-tab-panels
                     v-model="tab"
                     class="q-pa-md"
                     animated
                     swipeable
                     vertical
                  >
                     <q-tab-panel name="mails">
                        <q-card class="my-card q-ma-md" flat>
                           <q-item>
                              <q-item-section avatar>
                                 <q-avatar>
                                    <img :src="profil.avatar" />
                                 </q-avatar>
                              </q-item-section>

                              <q-item-section>
                                 <q-item-label
                                    :class="
                                       $q.screen.gt.xs ? 'text-h5' : 'text-h6'
                                    "
                                    >{{ profil.username }}
                                 </q-item-label>
                                 <q-item-label>
                                    <q-file
                                       outlined
                                       dense
                                       label="Modifier l'avatar"
                                       v-model="imageUpload"
                                       accept="image/*"
                                    >
                                       <template v-slot:prepend>
                                          <q-icon name="eva-attach-outline" />
                                       </template>
                                    </q-file>
                                 </q-item-label>
                              </q-item-section>
                           </q-item>
                        </q-card>

                        <q-card class="my-card q-ma-md" flat>
                           <q-item>
                              <q-item-section side style="width: 15%">
                                 <q-item-label> Nom </q-item-label>
                              </q-item-section>
                              <q-item-section>
                                 <q-input
                                    v-model="profil.name"
                                    label="Nom"
                                    hint="Aidez les gens à trouver votre compte à l’aide de votre nom le plus connu, que ce soit votre nom complet, votre surnom ou votre nom d’entreprise."
                                    outlined
                                    dense
                                 />
                              </q-item-section>
                           </q-item>
                        </q-card>

                        <q-card class="my-card q-ma-md" flat>
                           <q-item>
                              <q-item-section side style="width: 15%">
                                 <q-item-label>
                                    Nom d'utilisateur
                                 </q-item-label>
                              </q-item-section>
                              <q-item-section>
                                 <q-input
                                    v-model="profil.username"
                                    label="Nom d'utilisateur"
                                    outlined
                                    dense
                                 />
                              </q-item-section>
                           </q-item>
                           <q-item>
                              <q-item-section side style="width: 15%">
                                 <q-item-label> Bio </q-item-label>
                              </q-item-section>
                              <q-item-section>
                                 <q-input
                                    v-model="profil.bio"
                                    autogrow
                                    label="Bio"
                                    outlined
                                    dense
                                 />
                              </q-item-section>
                           </q-item>
                        </q-card>

                        <q-card class="my-card q-ma-md" flat>
                           <div class="text-h5 q-ma-md">
                              Informations personnelles
                           </div>
                        </q-card>
                        <q-card class="my-card q-ma-md" flat>
                           <q-item>
                              <q-item-section side style="width: 15%">
                                 <q-item-label> Adresse mail </q-item-label>
                              </q-item-section>
                              <q-item-section>
                                 <q-input
                                    v-model="profil.mail"
                                    label="Adresse mail"
                                    outlined
                                    dense
                                 />
                              </q-item-section>
                           </q-item>
                        </q-card>

                        <q-btn
                           @click="updateProfile"
                           :disable="!profil.username && !profil.mail"
                           class="q-ma-md"
                           color="primary"
                           label="Mettre à jour"
                           unelevated
                           rounded
                        />
                     </q-tab-panel>

                     <q-tab-panel name="alarms">
                        <div class="text-h4 q-mb-md">
                           Changer mon mot de passe
                        </div>
                        <p>
                           Lorem ipsum dolor sit, amet consectetur adipisicing
                           elit. Quis praesentium cumque magnam odio iure
                           quidem, quod illum numquam possimus obcaecati commodi
                           minima assumenda consectetur culpa fuga nulla ullam.
                           In, libero.
                        </p>
                     </q-tab-panel>
                  </q-tab-panels>
               </template>
            </q-splitter>
         </q-card>
      </div>
   </div>
</template>

<script>
import firebase from "firebase";
import { currentUser } from "../mixins/currentUser.js";

export default {
   name: "EditProfile",
   mixins: [currentUser],
   data() {
      return {
         tab: "mails",
         splitterModel: 25,
         imageUpload: [],
      };
   },
   methods: {
      updateProfile() {
         let user = firebase.auth().currentUser;
         firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
            .update({
               avatar: this.profil.avatar,
               name: this.profil.name,
               username: this.profil.username,
               bio: this.profil.bio,
               mail: this.profil.mail,
            })
            .then(() => {
               this.$router.push("/profil"),
                  this.$q.notify({
                     message: "Votre profil a été mis à jour",
                     actions: [{ icon: "eva-close-outline", color: "white" }],
                  });
            });
      },
   },
};
</script>

<style lang="sass">
.q-tab__label
   font-size: 1.2em
   line-height: 1.715em
   font-weight: 400
</style>