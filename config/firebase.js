const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey_V2.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

exports.db = admin.firestore();
