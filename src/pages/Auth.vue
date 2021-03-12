<template>
   <div class="constrain">
      <div class="align-center" style="max-width: 400px">
         <q-card flat bordered style="width: 100%" class="q-my-xl">
            <q-tabs v-model="tab">
               <q-tab name="Login" label="Login" />
               <q-tab name="Register" label="Register" />
            </q-tabs>
        <q-separator />

            <q-tab-panels v-model="tab" animated>
               <q-tab-panel name="Login">
                  <login-register :tab="tab" />
               </q-tab-panel>

               <q-tab-panel name="Register">
                  <login-register :tab="tab" />
               </q-tab-panel>
            </q-tab-panels>
         </q-card>
      </div>
   </div>
</template>

<script>
export default {
   data() {
      return {
         tab: "Login",
      };
   },
   components: {
      "login-register": require("pages/LoginRegister.vue").default,
   },
};
</script>

<style lang="sass">
.q-field--outlined
   margin-bottom: 10px
.align-center
   margin: auto
</style>