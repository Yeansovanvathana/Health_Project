const admin = require("firebase-admin");
// require("dotenv").config();

const serviceAccount = require("./healthcare.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.db = admin.firestore();
