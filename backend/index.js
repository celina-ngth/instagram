// Dependencies
const express = require("express");
const admin = require("firebase-admin");
let cors = require("cors");
let Busboy = require("busboy");
let path = require("path");
let os = require("os");
let fs = require("fs");
let UUID = require("uuid-v4"); // generate unique id

// Config - Express
const app = express();
app.use(cors());

// Config - Firebase
const serviceAccount = require("./serviceAccountKey.json");
const { parse } = require("path");
const { firestore } = require("firebase-admin");
const { log } = require("console");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "quasargram-4e56a.appspot.com"
});
const db = admin.firestore();
let bucket = admin.storage().bucket();

// End point - GET POSTS BY USER
app.get("/profil", (req, res) => {
  let posts = [];
  db.collection('posts')
    .where('author', '==', req.query.author)
    .get()
    .then((querySnapshot) => {
      querySnapshot.docs.forEach((document) => {
        posts.push(document.data())
      });
      res.send(posts)
    })
    .catch((error) => {
      console.log(`Error getting documents: ${error}`);
    });
})




// End point - get users
app.get("/users", (req, res) => {
  let users = [];
  db.collection("users")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        users.push(doc.data())
      })
      res.send(users)
    })
})
// End point - get posts 
app.get("/posts", (req, res) => {
  let posts = [];
  db.collection("posts")
    .orderBy("date", "desc")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        posts.push(doc.data())
      })
      res.send(posts)
    })
})
// End point - get one post
app.get("/posts/:id", (req, res) => {
  db.collection("posts")
    .doc(req.params.id)
    .get()
    .then(response => {
      res.status(200).send(response.data())
    })
    .catch(error => {
      res.status(400).send(error)
    })
})
// End point - create post
app.post("/createPost", (req, res) => {
  let uuid = UUID();
  let busboy = new Busboy({ headers: req.headers })
  let fields = {};

  busboy.on("file", function (fieldname, file, filename, encoding, mimetype) {
    console.log(
      "File [" +
      fieldname +
      "]: filename: " +
      filename +
      ", encoding: " +
      encoding +
      ", mimetype: " +
      mimetype
    );
    // /tmp/.png
    let filepath = path.join(os.tmpdir(), filename);
    file.pipe(fs.createWriteStream(filepath));
    fileData = { filepath, mimetype };
  });

  busboy.on("field", function (
    fieldname,
    val,
    fieldnameTruncated,
    valTruncated,
    encoding,
    mimetype
  ) {
    fields[fieldname] = val;
  });

  busboy.on("finish", function () {
    bucket.upload(
      fileData.filepath,
      {
        uploadType: "media",
        metadata: {
          metadata: {
            contentType: fileData.mimetype,
            firebaseStorageDownloadTokens: uuid
          }
        }
      },
      (err, uploadedFile) => {
        if (!err) {
          createDocument(uploadedFile);
        }
      }
    );

    function createDocument(uploadedFile) {
      db.collection("posts")
        .doc(fields.id)
        .set({
          id: fields.id,
          location: fields.location,
          caption: fields.caption,
          date: parseInt(fields.date),
          imageUrl: `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${uploadedFile.name}?alt=media&token=${uuid}`,
          author: fields.author
        })
        .then(() => {
          res.send("Post added" + fields.id);
        });
    }
  });

  req.pipe(busboy);
});

// End point - delete a post
app.delete("/posts/:id", (req, res) => {
  db.collection("posts")
    .doc(req.params.id)
    .delete()
    .then(() => {
      res.status(200).send(console.log('Post supprimé'))
    })
    .catch(error => {
      res.status(400).send(error)
    })
})







// Listen
app.listen(process.env.PORT || 3000);
