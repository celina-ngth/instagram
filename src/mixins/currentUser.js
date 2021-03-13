import firebase from "firebase";

export const currentUser = {
   mounted() {
      this.currentUser();
   },
   data() {
      return {
         profil: {
            avatar: "",
            name: "",
            username: "",
            bio: "",
            author: "",
            mail: ""
         },
      };
   },
   methods: {
      currentUser() {
         let user = firebase.auth().currentUser;
         firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
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
   }
}