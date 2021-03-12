<template>
   <div class="constrain">
      <div class="q-pa-lg align-center" style="max-width: 400px">
         <h6 class="q-my-md">{{ tab }}</h6>
         <q-form @submit="isLoginOrRegistration">
            <q-input
               v-if="tab == 'Register'"
               v-model="formData.username"
               label="Your username"
               outlined
               dense
               lazy-rules
            />

            <q-input
               v-model="formData.mail"
               type="email"
               label="Your e-mail"
               outlined
               dense
               lazy-rules
            />

            <q-input
               v-model="formData.password"
               label="Your password"
               type="password"
               outlined
               dense
               lazy-rules
            />

            <div>
               <q-btn
                  :label="tab"
                  type="submit"
                  color="primary"
                  class="full-width q-mt-sm"
                  unelevated
               />
            </div>
         </q-form>
      </div>
   </div>
</template>

<script>
import firebase from "firebase";

export default {
   name: "LoginRegister",
   props: ["tab"],
   data() {
      return {
         formData: {
            username: "",
            mail: "",
            password: "",
         },
         accept: false,
      };
   },
   methods: {
      isLoginOrRegistration() {
         if (this.tab == "Login") {
            this.login();
         } else {
            this.register();
         }
      },
      login() {
         firebase
            .auth()
            .signInWithEmailAndPassword(
               this.formData.mail,
               this.formData.password
            )
            .then((res) => {
               this.$router.push("/");
               this.$q.notify({
                  message: "Connected.",
                  actions: [{ icon: "eva-close-outline", color: "white" }],
               });
            })
            .catch((error) => {
               var errorCode = error.code;
               var errorMessage = error.message;
               console.log("error code : ", errorCode);
               console.log("error message : ", errorMessage);
            });
      },
      register(formData) {
         firebase
            .auth()
            .createUserWithEmailAndPassword(
               this.formData.mail,
               this.formData.password
            )
            .then(() => {
               var user = firebase.auth().currentUser;
               var mail, uid;

               uid = user.uid;
               mail = user.email;

               const userInfo = {
                  id: uid,
                  mail: mail,
                  username: this.formData.username,
               };

               firebase
                  .firestore()
                  .collection("users")
                  .doc(uid)
                  .set(userInfo)
                  .then(() => {
                     this.$router.push("/"),
                     this.$q.notify({
                        message: "Your account has been created.",
                        actions: [
                           { icon: "eva-close-outline", color: "white" },
                        ],
                     });
                  });
            })
            .catch((error) => {
               var errorCode = error.code;
               var errorMessage = error.message;
               console.log("error code : ", errorCode);
               console.log("error message : ", errorMessage);
            });
      },
   },
};
</script>

<style lang="sass">
.q-field--outlined
   margin-bottom: 10px
.align-center
   margin: auto
</style>